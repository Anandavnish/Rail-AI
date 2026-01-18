// Split Journey Discovery Engine
// Core algorithm to find alternate routes when direct tickets are unavailable

// Main function to discover split journey options
function discoverSplitJourneys(fromStation, toStation, classType, date = new Date(), maxSplits = 2) {
    const results = {
        directTrains: [],
        splitOptions: []
    };

    // First, check for direct trains
    const directTrains = getMultiTrainAvailability(fromStation, toStation, classType, date);
    results.directTrains = directTrains;

    // Check if we need split options (any direct train has confirmed seats?)
    const hasConfirmedDirect = directTrains.some(t => t.seatStatus.status === 'CNF');

    // Always generate split options for comparison, but prioritize if no direct confirmed
    if (maxSplits >= 1) {
        // Find 1-split journeys (via one intermediate junction)
        const oneSplitOptions = findOneSplitJourneys(fromStation, toStation, classType, date);
        results.splitOptions.push(...oneSplitOptions);
    }

    if (maxSplits >= 2 && !hasConfirmedDirect) {
        // Find 2-split journeys (via two intermediate junctions)
        const twoSplitOptions = findTwoSplitJourneys(fromStation, toStation, classType, date);
        results.splitOptions.push(...twoSplitOptions);
    }

    // Score and rank all split options
    results.splitOptions = results.splitOptions
        .map(option => ({
            ...option,
            score: calculateRouteScore(option)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5); // Return top 5 split options

    return results;
}

// Find split journeys via one intermediate junction
function findOneSplitJourneys(fromStation, toStation, classType, date) {
    const splitOptions = [];
    const intermediateJunctions = getIntermediateJunctions(fromStation, toStation);

    // Also check key junctions from corridors
    const corridor = findCorridor(fromStation, toStation);
    if (corridor) {
        corridor.keyJunctions.forEach(junc => {
            if (!intermediateJunctions.includes(junc)) {
                intermediateJunctions.push(junc);
            }
        });
    }

    // For each intermediate junction, find train combinations
    intermediateJunctions.forEach(junction => {
        // Find trains from origin to junction
        const firstLeg = getMultiTrainAvailability(fromStation, junction, classType, date);

        // Find trains from junction to destination
        const secondLeg = getMultiTrainAvailability(junction, toStation, classType, date);

        // Combine them
        firstLeg.forEach(leg1 => {
            secondLeg.forEach(leg2 => {
                // Check if connection is feasible (minimum 30 min layover, max 6 hours)
                const layover = calculateLayover(leg1.arrival, leg2.departure);

                if (layover >= 30 && layover <= 360) {
                    splitOptions.push({
                        type: '1-split',
                        legs: [leg1, leg2],
                        junctions: [junction],
                        totalFare: leg1.fare + leg2.fare,
                        totalDuration: leg1.duration + leg2.duration + layover,
                        layoverTime: layover,
                        confirmationProbability: calculateConfirmationProb([leg1, leg2])
                    });
                }
            });
        });
    });

    return splitOptions;
}

// Find split journeys via two intermediate junctions
function findTwoSplitJourneys(fromStation, toStation, classType, date) {
    const splitOptions = [];
    const intermediateJunctions = getIntermediateJunctions(fromStation, toStation);

    if (intermediateJunctions.length < 2) return splitOptions;

    // Try combinations of two junctions
    for (let i = 0; i < intermediateJunctions.length && i < 3; i++) {
        const junction1 = intermediateJunctions[i];

        for (let j = i + 1; j < intermediateJunctions.length && j < 4; j++) {
            const junction2 = intermediateJunctions[j];

            // Get trains for each leg
            const leg1Trains = getMultiTrainAvailability(fromStation, junction1, classType, date);
            const leg2Trains = getMultiTrainAvailability(junction1, junction2, classType, date);
            const leg3Trains = getMultiTrainAvailability(junction2, toStation, classType, date);

            // Only create option if each leg has at least one confirmed train
            const hasConfirmedLeg1 = leg1Trains.some(t => t.seatStatus.status === 'CNF');
            const hasConfirmedLeg2 = leg2Trains.some(t => t.seatStatus.status === 'CNF');
            const hasConfirmedLeg3 = leg3Trains.some(t => t.seatStatus.status === 'CNF');

            if (hasConfirmedLeg1 && hasConfirmedLeg2 && hasConfirmedLeg3) {
                // Take best option from each leg
                const bestLeg1 = leg1Trains.find(t => t.seatStatus.status === 'CNF');
                const bestLeg2 = leg2Trains.find(t => t.seatStatus.status === 'CNF');
                const bestLeg3 = leg3Trains.find(t => t.seatStatus.status === 'CNF');

                if (bestLeg1 && bestLeg2 && bestLeg3) {
                    const layover1 = calculateLayover(bestLeg1.arrival, bestLeg2.departure);
                    const layover2 = calculateLayover(bestLeg2.arrival, bestLeg3.departure);

                    if (layover1 >= 30 && layover1 <= 360 && layover2 >= 30 && layover2 <= 360) {
                        splitOptions.push({
                            type: '2-split',
                            legs: [bestLeg1, bestLeg2, bestLeg3],
                            junctions: [junction1, junction2],
                            totalFare: bestLeg1.fare + bestLeg2.fare + bestLeg3.fare,
                            totalDuration: bestLeg1.duration + bestLeg2.duration + bestLeg3.duration + layover1 + layover2,
                            layoverTime: layover1 + layover2,
                            confirmationProbability: calculateConfirmationProb([bestLeg1, bestLeg2, bestLeg3])
                        });
                    }
                }
            }
        }
    }

    return splitOptions;
}

// Calculate layover time between two trains (in minutes)
function calculateLayover(arrivalInfo, departureInfo) {
    const arrivalTime = arrivalInfo.date;
    const departureTime = departureInfo.date;

    const diff = departureTime - arrivalTime;
    return Math.floor(diff / 60000); // Convert to minutes
}

// Calculate confirmation probability for a journey
function calculateConfirmationProb(legs) {
    let totalProb = 1.0;

    legs.forEach(leg => {
        const status = leg.seatStatus.status;
        let legProb = 0;

        if (status === 'CNF') {
            legProb = 0.95; // 95% confirmation probability
        } else if (status === 'RAC') {
            const racValue = leg.seatStatus.availability;
            legProb = Math.max(0.5, 1 - (racValue / 40)); // RAC < 20 has >50% chance
        } else {
            const wlValue = leg.seatStatus.availability;
            legProb = Math.max(0.1, 1 - (wlValue / 100)); // WL < 50 has some chance
        }

        totalProb *= legProb;
    });

    return Math.round(totalProb * 100); // Return as percentage
}

// Calculate overall route score
function calculateRouteScore(splitOption) {
    let score = 0;

    // Confirmation probability (40% weight)
    score += splitOption.confirmationProbability * 0.4;

    // Journey time (30% weight) - shorter is better
    const avgDirectTime = 720; // Assume 12 hours average
    const timeFactor = Math.max(0, 100 - (splitOption.totalDuration / avgDirectTime * 100));
    score += timeFactor * 0.3;

    // Number of transfers (20% weight) - fewer is better
    const transferPenalty = splitOption.legs.length === 2 ? 100 : (splitOption.legs.length === 3 ? 70 : 40);
    score += transferPenalty * 0.2;

    // Layover time (10% weight) - moderate is better (not too short, not too long)
    const layoverScore = 100 - Math.abs(splitOption.layoverTime - 120) / 2;
    score += Math.max(0, layoverScore) * 0.1;

    return Math.round(score);
}

// Find relevant corridor for a journey
function findCorridor(fromStation, toStation) {
    for (const [name, corridor] of Object.entries(corridors)) {
        if (corridor.mainRoute.includes(fromStation) && corridor.mainRoute.includes(toStation)) {
            return corridor;
        }
    }
    return null;
}

// Get alternate boarding stations (nearby stations with better availability)
function getAlternateBoardingStations(station) {
    const alternates = [];
    const mainStation = stations[station];

    if (!mainStation) return alternates;

    // Find stations within 50km radius
    Object.keys(stations).forEach(code => {
        if (code === station) return;

        const distance = getDistance(station, code);
        if (distance <= 50 && distance > 0) {
            alternates.push({
                code: code,
                name: stations[code].name,
                distance: distance
            });
        }
    });

    return alternates.sort((a, b) => a.distance - b.distance).slice(0, 3);
}

// Format split journey for display
function formatSplitJourney(splitOption) {
    const formatted = {
        type: splitOption.type,
        totalLegs: splitOption.legs.length,
        journey: [],
        summary: {
            totalFare: `₹${splitOption.totalFare}`,
            totalDuration: `${Math.floor(splitOption.totalDuration / 60)}h ${splitOption.totalDuration % 60}m`,
            confirmationProb: `${splitOption.confirmationProbability}%`,
            score: splitOption.score
        }
    };

    splitOption.legs.forEach((leg, index) => {
        formatted.journey.push({
            legNumber: index + 1,
            trainNo: leg.trainNo,
            trainName: leg.trainName,
            trainType: leg.trainType,
            from: leg.from,
            to: leg.to,
            departure: leg.departure.time,
            arrival: leg.arrival.time + (leg.arrival.dayOffset || ''),
            duration: leg.durationFormatted,
            class: leg.class,
            seatStatus: `${leg.seatStatus.status}${leg.seatStatus.availability}`,
            fare: `₹${leg.fare}`,
            distance: `${leg.distance} km`
        });

        // Add layover info between legs
        if (index < splitOption.legs.length - 1) {
            const nextLeg = splitOption.legs[index + 1];
            const layover = calculateLayover(leg.arrival, nextLeg.departure);

            formatted.journey.push({
                type: 'layover',
                station: leg.to,
                duration: `${Math.floor(layover / 60)}h ${layover % 60}m`,
                waitTime: layover
            });
        }
    });

    return formatted;
}

// Main search function that returns formatted results
function searchTrains(fromStation, toStation, classType, date, includeAlternates = true) {
    const results = discoverSplitJourneys(fromStation, toStation, classType, date);

    // Format the results
    const formatted = {
        searchQuery: {
            from: stations[fromStation].name,
            to: stations[toStation].name,
            date: date.toISOString().split('T')[0],
            class: classType
        },
        directTrains: results.directTrains,
        splitJourneys: results.splitOptions.map(formatSplitJourney),
        hasConfirmedDirect: results.directTrains.some(t => t.seatStatus.status === 'CNF'),
        splitRecommendation: results.splitOptions.length > 0 ? results.splitOptions[0] : null
    };

    // Add alternate stations if requested
    if (includeAlternates && !formatted.hasConfirmedDirect) {
        formatted.alternateBoarding = getAlternateBoardingStations(fromStation);
        formatted.alternateDestination = getAlternateBoardingStations(toStation);
    }

    return formatted;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        discoverSplitJourneys,
        findOneSplitJourneys,
        findTwoSplitJourneys,
        calculateRouteScore,
        getAlternateBoardingStations,
        searchTrains,
        formatSplitJourney
    };
}
