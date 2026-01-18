// Fake Inventory System - Simulates realistic seat availability
// Generates dynamic seat status for demo purposes

// Class-wise seat configurations
const seatConfig = {
    'SL': { total: 72, baseAvailability: 0.4 },  // Sleeper
    '3A': { total: 64, baseAvailability: 0.5 },  // AC 3 Tier
    '2A': { total: 48, baseAvailability: 0.6 },  // AC 2 Tier
    '1A': { total: 24, baseAvailability: 0.7 },  // AC 1st Class
    'CC': { total: 78, baseAvailability: 0.5 }   // Chair Car
};

// Base fare per km per class (in INR)
const baseFares = {
    'SL': 0.50,
    '3A': 1.50,
    '2A': 2.00,
    '1A': 3.50,
    'CC': 0.90
};

// Quota types and their impact on availability
const quotas = ['GN', 'TQ', 'PT', 'LD'];  // General, Tatkal, Premium Tatkal, Ladies

// Generate seat status for a train segment
function generateSeatStatus(trainNo, fromStation, toStation, classType, date = new Date()) {
    // Use pseudo-random based on train number and stations for consistency
    const seed = parseInt(trainNo) + fromStation.charCodeAt(0) + toStation.charCodeAt(0) + date.getDate();
    const random = (seed * 9301 + 49297) % 233280 / 233280;

    const config = seatConfig[classType];
    if (!config) return null;

    // Calculate availability based on class and randomness
    const availabilityFactor = config.baseAvailability + (random - 0.5) * 0.4;
    const available = Math.max(0, Math.floor(config.total * availabilityFactor));

    // Determine status
    let status, value;
    if (available >= 10) {
        status = 'CNF';
        value = available;
    } else if (available > 0) {
        status = 'CNF';
        value = available;
    } else if (random > 0.7) {
        status = 'RAC';
        value = Math.floor(random * 20);
    } else {
        status = 'WL';
        value = Math.floor(random * 100 + 20);
    }

    return {
        class: classType,
        status: status,
        availability: value,
        total: config.total
    };
}

// Generate availability for all classes on a segment
function getSegmentAvailability(trainNo, fromStation, toStation, date = new Date()) {
    // Get train from railway graph
    const train = trains.find(t => t.trainNo === trainNo);
    if (!train) return null;

    const availability = {};
    train.classes.forEach(cls => {
        availability[cls] = generateSeatStatus(trainNo, fromStation, toStation, cls, date);
    });

    return {
        trainNo: train.trainNo,
        trainName: train.trainName,
        from: fromStation,
        to: toStation,
        availability: availability
    };
}

// Calculate fare for a segment
function calculateFare(fromStation, toStation, classType) {
    const distance = getDistance(fromStation, toStation);
    const baseFare = baseFares[classType];

    if (!baseFare || !distance) return 0;

    // Base calculation
    let fare = distance * baseFare;

    // Add reservation charge
    const reservationCharge = classType === 'SL' ? 20 : (classType === 'CC' ? 15 : 40);
    fare += reservationCharge;

    // Add superfast surcharge (approx 15%)
    fare += fare * 0.15;

    // Add GST (5%)
    fare += fare * 0.05;

    return Math.round(fare);
}

// Get complete journey details with availability and fare
function getJourneyDetails(trainNo, fromStation, toStation, classType, date = new Date()) {
    const train = trains.find(t => t.trainNo === trainNo);
    if (!train) return null;

    const fromIdx = train.route.indexOf(fromStation);
    const toIdx = train.route.indexOf(toStation);

    if (fromIdx === -1 || toIdx === -1 || fromIdx >= toIdx) return null;

    // Calculate total distance and duration
    let totalDistance = 0;
    for (let i = fromIdx; i < toIdx; i++) {
        totalDistance += getDistance(train.route[i], train.route[i + 1]);
    }

    const duration = Math.round(totalDistance / train.avgSpeed * 60); // in minutes

    // Get availability
    const seatStatus = generateSeatStatus(trainNo, fromStation, toStation, classType, date);

    // Calculate fare
    const fare = calculateFare(fromStation, toStation, classType);

    return {
        trainNo: train.trainNo,
        trainName: train.trainName,
        trainType: train.trainType,
        from: {
            code: fromStation,
            name: stations[fromStation].name
        },
        to: {
            code: toStation,
            name: stations[toStation].name
        },
        distance: totalDistance,
        duration: duration,
        durationFormatted: `${Math.floor(duration / 60)}h ${duration % 60}m`,
        class: classType,
        seatStatus: seatStatus,
        fare: fare,
        // Mock departure and arrival times
        departure: calculateDepartureTime(trainNo, fromStation, date),
        arrival: calculateArrivalTime(trainNo, toStation, date, duration)
    };
}

// Helper to calculate mock departure time
function calculateDepartureTime(trainNo, station, date) {
    // Generate pseudo-random hour based on train number
    const seed = parseInt(trainNo) + station.charCodeAt(0);
    const hour = (seed % 18) + 6; // Between 6 AM and 11 PM
    const minute = (seed * 7) % 60;

    const depTime = new Date(date);
    depTime.setHours(hour, minute, 0, 0);

    return {
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        date: depTime
    };
}

// Helper to calculate mock arrival time
function calculateArrivalTime(trainNo, station, date, durationMinutes) {
    const departure = calculateDepartureTime(trainNo, station, date);
    const arrivalDate = new Date(departure.date.getTime() + durationMinutes * 60000);

    const hour = arrivalDate.getHours();
    const minute = arrivalDate.getMinutes();
    const day = arrivalDate.getDate() !== date.getDate() ? '+1' : '';

    return {
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        date: arrivalDate,
        dayOffset: day
    };
}

// Simulate different availability scenarios for demo
function setScenario(scenario) {
    // Scenarios: 'peak', 'normal', 'low-demand'
    // This would adjust the base availability factors
    const factors = {
        'peak': 0.2,      // Less availability
        'normal': 0.5,    // Normal
        'low-demand': 0.8 // High availability
    };

    const factor = factors[scenario] || 0.5;

    Object.keys(seatConfig).forEach(cls => {
        seatConfig[cls].baseAvailability = factor;
    });
}

// Force specific trains to be waitlisted (for demo split journey)
function forceWaitlist(trainNumbers) {
    // This is for demo purposes to show split journey benefits
    window.forcedWaitlist = trainNumbers || [];
}

// Check if a train is forced to waitlist
function isForceWaitlisted(trainNo) {
    return window.forcedWaitlist && window.forcedWaitlist.includes(trainNo);
}

// Modified seat status generation that respects forced waitlist
function generateSeatStatusWithOverride(trainNo, fromStation, toStation, classType, date = new Date()) {
    if (isForceWaitlisted(trainNo)) {
        const config = seatConfig[classType];
        const seed = parseInt(trainNo) + fromStation.charCodeAt(0);
        const random = (seed * 9301 + 49297) % 233280 / 233280;

        return {
            class: classType,
            status: 'WL',
            availability: Math.floor(random * 100 + 50),
            total: config.total
        };
    }

    return generateSeatStatus(trainNo, fromStation, toStation, classType, date);
}

// Get availability summary for multiple trains
function getMultiTrainAvailability(fromStation, toStation, classType, date = new Date()) {
    const availableTrains = getTrainsBetween(fromStation, toStation);

    return availableTrains.map(train => {
        if (!train.classes.includes(classType)) return null;
        return getJourneyDetails(train.trainNo, fromStation, toStation, classType, date);
    }).filter(t => t !== null);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        seatConfig,
        baseFares,
        generateSeatStatus,
        getSegmentAvailability,
        calculateFare,
        getJourneyDetails,
        setScenario,
        forceWaitlist,
        generateSeatStatusWithOverride,
        getMultiTrainAvailability
    };
}
