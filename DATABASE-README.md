# Railway Database Documentation

## Overview
This database contains comprehensive Indian Railway train data for the RailAI split journey discovery system. It includes **10 trains** covering all major routes from Patna in both directions.

## Database File
- **File**: `trains-database.json`
- **Size**: ~85 KB
- **Trains**: 10 comprehensive train routes
- **Date Range**: January 20, 2026 to February 28, 2026

## Routes Covered

### ✅ Patna → Kota
1. **13237** - Patna - Kota Express (Tue, Sat, Sun)

### ✅ Patna → Jaipur
2. **12562** - Patna - Jaipur SF Express (Mon, Wed, Fri)

### ✅ Patna → Delhi
3. **12309** - Patna - New Delhi Rajdhani Express (Daily)
4. **12802** - Purushottam SF Express, PURI-NDLS (Daily) - passes through Patna

### ✅ Patna → Howrah
5. **12024** - Patna - Howrah Jan Shatabdi Express (Mon-Sat)
6. **13006** - Amritsar - Howrah Mail (Daily) - passes through Patna

### ✅ Return Directions
7. **13238** - Kota → Patna Express (Mon, Thu, Sat)
8. **12563** - Jaipur → Patna SF Express (Tue, Thu, Sat)
9. **12310** - New Delhi → Patna Rajdhani Express (Daily)
10. **12023** - Howrah → Patna Jan Shatabdi Express (Mon-Sat)

## Database Structure

### Train Object
```json
{
  "trainNumber": "13237",
  "trainName": "Patna - Kota Express",
  "trainType": "Express",
  "runningDays": ["Tue", "Sat", "Sun"],
  "quotaResetJunctions": ["DDU", "CNB", "SWM"],
  "route": [...],
  "availability": {...}
}
```

### Train Types Included
- **Rajdhani** - Premium AC trains (fastest)
- **Superfast** - Fast passenger trains
- **Jan Shatabdi** - Day trains with AC Chair Car
- **Express** - Regular express trains
- **Mail** - Mail/Express trains

### Station Object (in route array)
```json
{
  "stationName": "Pt. DD Upadhyaya Junction",
  "stationCode": "DDU",
  "arrivalTime": "15:00",
  "departureTime": "15:10",
  "dayOfJourney": 1,
  "distanceFromSource": 212,
  "platform": 6,
  "importance": "major"
}
```

**Station Importance Levels:**
- `major` - Major junctions (ideal for quota reset, split journeys)
- `junction` - Regular junctions
- `minor` - Small stations

### Seat Availability Object
```json
{
  "2026-01-20": {
    "SL": {
      "available": 87,
      "status": "AVAILABLE",
      "fare": 500,
      "quotas": {
        "GN": 61,   // General Quota
        "TQ": 26,   // Tatkal Quota
        "LD": 8,    // Ladies Quota
        "SS": 4     // Senior Citizen/Others
      }
    }
  }
}
```

**Classes:**
- `SL` - Sleeper Class
- `3A` - AC 3-Tier
- `2A` - AC 2-Tier
- `1A` - AC First Class
- `CC` - AC Chair Car (for Shatabdi/Jan Shatabdi trains)

**Status Values:**
- `AVAILABLE` - Confirmed seats available
- `RAC` - RAC (Reservation Against Cancellation)
- `WL/XX` - Waiting List with position (e.g., WL/25)

## Key Features for Split Journey Algorithm

### 1. Quota Reset Junctions
Each train has a `quotaResetJunctions` array listing stations where quotas reset. These are ideal breaking points for split journeys:

**Major Quota Reset Stations:**
- **DDU** (Pt. DD Upadhyaya Junction/Mughalsarai)
- **CNB** (Kanpur Central)
- **PRYJ** (Prayagraj Junction)
- **SWM** (Sawai Madhopur)
- **JAJ** (Jhajha)
- **ASN** (Asansol)

### 2. Common Corridors
Multiple trains share common stations, enabling split journey combinations:

**Patna → Delhi Corridor:**
- Shared stations: PNBE → DDU → PRYJ → CNB → NDLS
- Trains: 12309, 12802

**Patna → Howrah Corridor:**
- Shared stations: PNBE → JAJ → ASN → HWH
- Trains: 12024, 13006

### 3. Date-Based Availability
Availability data for 5 sample dates:
- 2026-01-20
- 2026-01-22
- 2026-01-25
- 2026-02-01
- 2026-02-10

## Usage in RailAI

### Loading the Database
```javascript
// Load trains data
fetch('trains-database.json')
  .then(response => response.json())
  .then(data => {
    const trains = data.trains;
    console.log(`Loaded ${trains.length} trains`);
  });
```

### Finding Split Journey Options
```javascript
// Example: Find trains from PNBE to DDU, then DDU to KOTA
function findSplitJourney(from, via, to, date) {
  // 1. Find trains from PNBE to DDU with availability
  // 2. Find trains from DDU to KOTA with availability
  // 3. Check if connection time is feasible (2-6 hours ideal)
  // 4. Rank by total journey time and confirmation probability
}
```

### Checking Seat Availability
```javascript
function checkAvailability(train, date, classType) {
  if (train.availability[date]) {
    return train.availability[date][classType];
  }
  return null;
}

// Example
const train = trains.find(t => t.trainNumber === "13237");
const availability = checkAvailability(train, "2026-01-20", "SL");
console.log(`Available: ${availability.available}, Status: ${availability.status}`);
```

## Extending the Database

### Adding More Trains
Edit `generate-database.py` and add new train objects to the `all_trains` array, then run:
```bash
python generate-database.py
```

### Adding More Dates
Modify the `sample_dates` array in `generate-database.py`:
```python
sample_dates = ["2026-01-20", "2026-01-22", ...]
```

### Customizing Availability
Adjust the `generate_availability()` function to modify:
- Base seat counts
- Availability factors by train type
- Quota distributions
- Waitlist probability

## Split Journey Examples

### Example 1: Patna → Kota (if direct WL)
**Option A:**
1. Train 12309 (PNBE → DDU) - Depart 19:10, Arrive 22:22
2. Train 13237 (DDU → KOTA) - Depart 15:00 (next day)

**Option B:**
1. Train 13237 (PNBE → CNB) - Depart 11:45, Arrive 01:30
2. Look for alternate train (CNB → KOTA)

### Example 2: Patna → Jaipur (if direct WL)
**Option:**
1. Train 12309 (PNBE → CNB) - Rajdhani, high confirmation
2. Train from CNB → JP - Check availability

## Important Notes

1. **Quota Reset Advantage**: Booking from quota-reset junctions often has higher confirmation chances
2. **Train Type Priority**: Rajdhani/Duronto have highest confirmation probability
3. **Connection Time**: Maintain 2-6 hours gap at junction stations for safety
4. **Multiple Routes**: Some journeys can have 3+ different split combinations
5. **Date Compatibility**: Ensure running days align for multi-leg journeys

## Next Steps

You can now:
1. ✅ Integrate `trains-database.json` into your RailAI frontend
2. ✅ Build search functionality to query trains by route
3. ✅ Implement split journey algorithm using quota reset junctions
4. ✅ Display seat availability with real-time-like updates
5. ✅ Add filters by train type, class, availability status

---

**Generated**: 2026-01-18  
**Total Trains**: 10  
**Generator Script**: `generate-database.py`
