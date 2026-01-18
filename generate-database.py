import json
import random
from datetime import datetime, timedelta

# Helper function to generate seat availability
def generate_availability(date_str, train_type):
    """Generate realistic seat availability based on train type"""
    if train_type in ["Rajdhani", "Shatabdi", "Duronto"]:
        availability_factor = 0.3  # Premium trains fill faster
    elif train_type in ["Superfast"]:
        availability_factor = 0.5
    else:
        availability_factor = 0.7  # Express/Mail trains
    
    classes = {
        "SL": {
            "base_seats": 400,
            "fare_multiplier": 1
        },
        "3A": {
            "base_seats": 150,
            "fare_multiplier": 2.8
        },
        "2A": {
            "base_seats": 80,
            "fare_multiplier": 4
        },
        "1A": {
            "base_seats": 40,
            "fare_multiplier": 6.5
        }
    }
    
    availability = {}
    for class_code, data in classes.items():
        available = int(data["base_seats"] * availability_factor * random.uniform(0.1, 1.2))
        
        if available > 100:
            status = "AVAILABLE"
            wl = 0
        elif available > 20:
            status = "AVAILABLE"
            wl = 0
        elif available > 0:
            status = f"RAC"
            wl = 0
        else:
            wl = random.randint(1, 150)
            status = f"WL/{wl}"
            available = 0
        
        availability[class_code] = {
            "available": available,
            "status": status,
            "fare": int(500 * data["fare_multiplier"]),
            "quotas": {
                "GN": max(0, available - int(available * 0.3)),
                "TQ": int(available * 0.3) if available > 0 else 0,
                "LD": max(0, int(available * 0.1)),
                "SS": max(0, int(available * 0.05))
            }
        }
    
    return {date_str: availability}

# All trains data
trains_database = {
    "meta": {
        "version": "2.0",
        "generatedDate": "2026-01-18",
        "validityPeriod": {
            "start": "2026-01-20",
            "end": "2026-02-28"
        },
        "description": "Enhanced Indian Railways Database with Seat Availability and Split Journey Support"
    },
    "trains": []
}

# Train definitions
all_trains = [
    # Patna to Kota trains
    {
        "trainNumber": "13237",
        "trainName": "Patna - Kota Express",
        "trainType": "Express",
        "runningDays": ["Tue", "Sat", "Sun"],
        "quotaResetJunctions": ["DDU", "CNB", "SWM"],
        "route": [
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "Source", "departureTime": "11:45", "dayOfJourney": 1, "distanceFromSource": 0, "platform": 3, "importance": "major"},
            {"stationName": "Danapur", "stationCode": "DNR", "arrivalTime": "11:58", "departureTime": "12:00", "dayOfJourney": 1, "distanceFromSource": 10, "platform": 3, "importance": "minor"},
            {"stationName": "Ara Junction", "stationCode": "ARA", "arrivalTime": "12:31", "departureTime": "12:33", "dayOfJourney": 1, "distanceFromSource": 49, "platform": 2, "importance": "junction"},
            {"stationName": "Buxar", "stationCode": "BXR", "arrivalTime": "13:24", "departureTime": "13:26", "dayOfJourney": 1, "distanceFromSource": 118, "platform": 2, "importance": "minor"},
            {"stationName": "Pt. DD Upadhyaya Junction", "stationCode": "DDU", "arrivalTime": "15:00", "departureTime": "15:10", "dayOfJourney": 1, "distanceFromSource": 212, "platform": 6, "importance": "major"},
            {"stationName": "Varanasi Junction", "stationCode": "BSB", "arrivalTime": "16:00", "departureTime": "16:10", "dayOfJourney": 1, "distanceFromSource": 230, "platform": 5, "importance": "major"},
            {"stationName": "Prayagraj Junction", "stationCode": "PRYJ", "arrivalTime": "18:45", "departureTime": "18:55", "dayOfJourney": 1, "distanceFromSource": 364, "platform": 4, "importance": "major"},
            {"stationName": "Kanpur Central", "stationCode": "CNB", "arrivalTime": "01:25", "departureTime": "01:30", "dayOfJourney": 2, "distanceFromSource": 619, "platform": 5, "importance": "major"},
            {"stationName": "Tundla Junction", "stationCode": "TDL", "arrivalTime": "05:00", "departureTime": "05:05", "dayOfJourney": 2, "distanceFromSource": 850, "platform": 4, "importance": "junction"},
            {"stationName": "Agra Cantt", "stationCode": "AGC", "arrivalTime": "06:05", "departureTime": "06:10", "dayOfJourney": 2, "distanceFromSource": 879, "platform": 3, "importance": "major"},
            {"stationName": "Mathura Junction", "stationCode": "MTJ", "arrivalTime": "07:15", "departureTime": "07:20", "dayOfJourney": 2, "distanceFromSource": 933, "platform": 2, "importance": "junction"},
            {"stationName": "Sawai Madhopur Junction", "stationCode": "SWM", "arrivalTime": "10:30", "departureTime": "10:45", "dayOfJourney": 2, "distanceFromSource": 1149, "platform": 2, "importance": "major"},
            {"stationName": "Kota Junction", "stationCode": "KOTA", "arrivalTime": "12:55", "departureTime": "Destination", "dayOfJourney": 2, "distanceFromSource": 1257, "platform": 1, "importance": "major"}
        ]
    },
    {
        "trainNumber": "12562",
        "trainName": "Patna - Jaipur SF Express",
        "trainType": "Superfast",
        "runningDays": ["Mon", "Wed", "Fri"],
        "quotaResetJunctions": ["DDU", "PRYJ", "CNB"],
        "route": [
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "Source", "departureTime": "15:20", "dayOfJourney": 1, "distanceFromSource": 0, "platform": 2, "importance": "major"},
            {"stationName": "Ara Junction", "stationCode": "ARA", "arrivalTime": "16:10", "departureTime": "16:12", "dayOfJourney": 1, "distanceFromSource": 49, "platform": 3, "importance": "junction"},
            {"stationName": "Buxar", "stationCode": "BXR", "arrivalTime": "17:05", "departureTime": "17:07", "dayOfJourney": 1, "distanceFromSource": 118, "platform": 1, "importance": "minor"},
            {"stationName": "Pt. DD Upadhyaya Junction", "stationCode": "DDU", "arrivalTime": "18:40", "departureTime": "18:50", "dayOfJourney": 1, "distanceFromSource": 212, "platform": 4, "importance": "major"},
            {"stationName": "Prayagraj Junction", "stationCode": "PRYJ", "arrivalTime": "21:15", "departureTime": "21:25", "dayOfJourney": 1, "distanceFromSource": 364, "platform": 2, "importance": "major"},
            {"stationName": "Kanpur Central", "stationCode": "CNB", "arrivalTime": "23:50", "departureTime": "00:00", "dayOfJourney": 2, "distanceFromSource": 559, "platform": 3, "importance": "major"},
            {"stationName": "Agra Cantt", "stationCode": "AGC", "arrivalTime": "04:30", "departureTime": "04:35", "dayOfJourney": 2, "distanceFromSource": 813, "platform": 2, "importance": "major"},
            {"stationName": "Mathura Junction", "stationCode": "MTJ", "arrivalTime": "05:45", "departureTime": "05:50", "dayOfJourney": 2, "distanceFromSource": 867, "platform": 1, "importance": "junction"},
            {"stationName": "Bharatpur Junction", "stationCode": "BTE", "arrivalTime": "06:35", "departureTime": "06:37", "dayOfJourney": 2, "distanceFromSource": 920, "platform": 2, "importance": "junction"},
            {"stationName": "Bandikui Junction", "stationCode": "BKI", "arrivalTime": "08:05", "departureTime": "08:07", "dayOfJourney": 2, "distanceFromSource": 1025, "platform": 1, "importance": "junction"},
            {"stationName": "Jaipur Junction", "stationCode": "JP", "arrivalTime": "10:15", "departureTime": "Destination", "dayOfJourney": 2, "distanceFromSource": 1120, "platform": 5, "importance": "major"}
        ]
    },
    # Patna to Delhi trains
    {
        "trainNumber": "12309",
        "trainName": "Patna - New Delhi Rajdhani Express",
        "trainType": "Rajdhani",
        "runningDays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "quotaResetJunctions": ["DDU", "CNB"],
        "route": [
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "Source", "departureTime": "19:10", "dayOfJourney": 1, "distanceFromSource": 0, "platform": 1, "importance": "major"},
            {"stationName": "Pt. DD Upadhyaya Junction", "stationCode": "DDU", "arrivalTime": "22:12", "departureTime": "22:22", "dayOfJourney": 1, "distanceFromSource": 212, "platform": 7, "importance": "major"},
            {"stationName": "Prayagraj Junction", "stationCode": "PRYJ", "arrivalTime": "00:10", "departureTime": "00:12", "dayOfJourney": 2, "distanceFromSource": 364, "platform": 1, "importance": "major"},
            {"stationName": "Kanpur Central", "stationCode": "CNB", "arrivalTime": "02:15", "departureTime": "02:20", "dayOfJourney": 2, "distanceFromSource": 559, "platform": 1, "importance": "major"},
            {"stationName": "New Delhi", "stationCode": "NDLS", "arrivalTime": "07:40", "departureTime": "Destination", "dayOfJourney": 2, "distanceFromSource": 999, "platform": 15, "importance": "major"}
        ]
    },
    {
        "trainNumber": "12802",
        "trainName": "Purushottam SF Express (PURI-NDLS)",
        "trainType": "Superfast",
        "runningDays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "quotaResetJunctions": ["PNBE", "DDU", "PRYJ", "CNB"],
        "route": [
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "00:35", "departureTime": "00:45", "dayOfJourney": 1, "distanceFromSource": 456, "platform": 4, "importance": "major"},
            {"stationName": "Pt. DD Upadhyaya Junction", "stationCode": "DDU", "arrivalTime": "03:30", "departureTime": "03:40", "dayOfJourney": 1, "distanceFromSource": 668, "platform": 3, "importance": "major"},
            {"stationName": "Prayagraj Junction", "stationCode": "PRYJ", "arrivalTime": "05:40", "departureTime": "05:50", "dayOfJourney": 1, "distanceFromSource": 820, "platform": 3, "importance": "major"},
            {"stationName": "Kanpur Central", "stationCode": "CNB", "arrivalTime": "08:05", "departureTime": "08:15", "dayOfJourney": 1, "distanceFromSource": 1015, "platform": 2, "importance": "major"},
            {"stationName": "Tundla Junction", "stationCode": "TDL", "arrivalTime": "11:48", "departureTime": "11:50", "dayOfJourney": 1, "distanceFromSource": 1246, "platform": 3, "importance": "junction"},
            {"stationName": "New Delhi", "stationCode": "NDLS", "arrivalTime": "15:55", "departureTime": "Destination", "dayOfJourney": 1, "distanceFromSource": 1455, "platform": 12, "importance": "major"}
        ]
    },
    # Patna to Howrah trains
    {
        "trainNumber": "12024",
        "trainName": "Patna - Howrah Jan Shatabdi Express",
        "trainType": "Jan Shatabdi",
        "runningDays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "quotaResetJunctions": ["JAJ", "ASN"],
        "route": [
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "Source", "departureTime": "05:30", "dayOfJourney": 1, "distanceFromSource": 0, "platform": 1, "importance": "major"},
            {"stationName": "Patna Sahib", "stationCode": "PNC", "arrivalTime": "05:43", "departureTime": "05:45", "dayOfJourney": 1, "distanceFromSource": 10, "platform": 1, "importance": "minor"},
            {"stationName": "Mokama", "stationCode": "MKA", "arrivalTime": "06:58", "departureTime": "07:00", "dayOfJourney": 1, "distanceFromSource": 89, "platform": 1, "importance": "junction"},
            {"stationName": "Lakhisarai Junction", "stationCode": "LKR", "arrivalTime": "07:28", "departureTime": "07:30", "dayOfJourney": 1, "distanceFromSource": 122, "platform": 2, "importance": "junction"},
            {"stationName": "Jhajha", "stationCode": "JAJ", "arrivalTime": "08:26", "departureTime": "08:31", "dayOfJourney": 1, "distanceFromSource": 177, "platform": 2, "importance": "major"},
            {"stationName": "Jasidih Junction", "stationCode": "JSME", "arrivalTime": "09:07", "departureTime": "09:12", "dayOfJourney": 1, "distanceFromSource": 221, "platform": 1, "importance": "junction"},
            {"stationName": "Madhupur Junction", "stationCode": "MDP", "arrivalTime": "09:37", "departureTime": "09:39", "dayOfJourney": 1, "distanceFromSource": 250, "platform": 3, "importance": "junction"},
            {"stationName": "Asansol Junction", "stationCode": "ASN", "arrivalTime": "10:55", "departureTime": "11:00", "dayOfJourney": 1, "distanceFromSource": 331, "platform": 5, "importance": "major"},
            {"stationName": "Durgapur", "stationCode": "DGR", "arrivalTime": "11:33", "departureTime": "11:35", "dayOfJourney": 1, "distanceFromSource": 373, "platform": 4, "importance": "junction"},
            {"stationName": "Howrah Junction", "stationCode": "HWH", "arrivalTime": "13:35", "departureTime": "Destination", "dayOfJourney": 1, "distanceFromSource": 532, "platform": 9, "importance": "major"}
        ]
    },
    {
        "trainNumber": "13006",
        "trainName": "Amritsar - Howrah Mail (ASR-HWH)",
        "trainType": "Mail",
        "runningDays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "quotaResetJunctions": ["PNBE", "JAJ", "ASN"],
        "route": [
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "16:40", "departureTime": "16:50", "dayOfJourney": 1, "distanceFromSource": 820, "platform": 5, "importance": "major"},
            {"stationName": "Mokama", "stationCode": "MKA", "arrivalTime": "18:05", "departureTime": "18:07", "dayOfJourney": 1, "distanceFromSource": 909, "platform": 2, "importance": "junction"},
            {"stationName": "Jhajha", "stationCode": "JAJ", "arrivalTime": "19:45", "departureTime": "19:50", "dayOfJourney": 1, "distanceFromSource": 997, "platform": 1, "importance": "major"},
            {"stationName": "Jasidih Junction", "stationCode": "JSME", "arrivalTime": "20:32", "departureTime": "20:37", "dayOfJourney": 1, "distanceFromSource": 1041, "platform": 2, "importance": "junction"},
            {"stationName": "Asansol Junction", "stationCode": "ASN", "arrivalTime": "22:25", "departureTime": "22:35", "dayOfJourney": 1, "distanceFromSource": 1151, "platform": 4, "importance": "major"},
            {"stationName": "Durgapur", "stationCode": "DGR", "arrivalTime": "23:07", "departureTime": "23:09", "dayOfJourney": 1, "distanceFromSource": 1193, "platform": 3, "importance": "junction"},
            {"stationName": "Howrah Junction", "stationCode": "HWH", "arrivalTime": "01:15", "departureTime": "Destination", "dayOfJourney": 2, "distanceFromSource": 1352, "platform": 14, "importance": "major"}
        ]
    },
    # Reverse direction trains - Kota to Patna
    {
        "trainNumber": "13238",
        "trainName": "Kota - Patna Express",
        "trainType": "Express",
        "runningDays": ["Mon", "Thu", "Sat"],
        "quotaResetJunctions": ["SWM", "CNB", "DDU"],
        "route": [
            {"stationName": "Kota Junction", "stationCode": "KOTA", "arrivalTime": "Source", "departureTime": "08:15", "dayOfJourney": 1, "distanceFromSource": 0, "platform": 2, "importance": "major"},
            {"stationName": "Sawai Madhopur Junction", "stationCode": "SWM", "arrivalTime": "10:25", "departureTime": "10:35", "dayOfJourney": 1, "distanceFromSource": 108, "platform": 1, "importance": "major"},
            {"stationName": "Mathura Junction", "stationCode": "MTJ", "arrivalTime": "14:10", "departureTime": "14:15", "dayOfJourney": 1, "distanceFromSource": 324, "platform": 3, "importance": "junction"},
            {"stationName": "Agra Cantt", "stationCode": "AGC", "arrivalTime": "15:20", "departureTime": "15:25", "dayOfJourney": 1, "distanceFromSource": 378, "platform": 2, "importance": "major"},
            {"stationName": "Tundla Junction", "stationCode": "TDL", "arrivalTime": "16:10", "departureTime": "16:15", "dayOfJourney": 1, "distanceFromSource": 407, "platform": 3, "importance": "junction"},
            {"stationName": "Kanpur Central", "stationCode": "CNB", "arrivalTime": "19:55", "departureTime": "20:05", "dayOfJourney": 1, "distanceFromSource": 638, "platform": 4, "importance": "major"},
            {"stationName": "Prayagraj Junction", "stationCode": "PRYJ", "arrivalTime": "22:45", "departureTime": "22:55", "dayOfJourney": 1, "distanceFromSource": 833, "platform": 3, "importance": "major"},
            {"stationName": "Varanasi Junction", "stationCode": "BSB", "arrivalTime": "01:40", "departureTime": "01:50", "dayOfJourney": 2, "distanceFromSource": 1027, "platform": 6, "importance": "major"},
            {"stationName": "Pt. DD Upadhyaya Junction", "stationCode": "DDU", "arrivalTime": "02:45", "departureTime": "02:55", "dayOfJourney": 2, "distanceFromSource": 1045, "platform": 5, "importance": "major"},
            {"stationName": "Buxar", "stationCode": "BXR", "arrivalTime": "04:38", "departureTime": "04:40", "dayOfJourney": 2, "distanceFromSource": 1139, "platform": 1, "importance": "minor"},
            {"stationName": "Ara Junction", "stationCode": "ARA", "arrivalTime": "05:35", "departureTime": "05:37", "dayOfJourney": 2, "distanceFromSource": 1208, "platform": 3, "importance": "junction"},
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "06:45", "departureTime": "Destination", "dayOfJourney": 2, "distanceFromSource": 1257, "platform": 4, "importance": "major"}
        ]
    },
    # Jaipur to Patna
    {
        "trainNumber": "12563",
        "trainName": "Jaipur - Patna SF Express",
        "trainType": "Superfast",
        "runningDays": ["Tue", "Thu", "Sat"],
        "quotaResetJunctions": ["CNB", "PRYJ", "DDU"],
        "route": [
            {"stationName": "Jaipur Junction", "stationCode": "JP", "arrivalTime": "Source", "departureTime": "18:45", "dayOfJourney": 1, "distanceFromSource": 0, "platform": 3, "importance": "major"},
            {"stationName": "Bandikui Junction", "stationCode": "BKI", "arrivalTime": "20:05", "departureTime": "20:07", "dayOfJourney": 1, "distanceFromSource": 95, "platform": 2, "importance": "junction"},
            {"stationName": "Bharatpur Junction", "stationCode": "BTE", "arrivalTime": "21:33", "departureTime": "21:35", "dayOfJourney": 1, "distanceFromSource": 200, "platform": 1, "importance": "junction"},
            {"stationName": "Mathura Junction", "stationCode": "MTJ", "arrivalTime": "22:20", "departureTime": "22:25", "dayOfJourney": 1, "distanceFromSource": 253, "platform": 2, "importance": "junction"},
            {"stationName": "Agra Cantt", "stationCode": "AGC", "arrivalTime": "23:35", "departureTime": "23:40", "dayOfJourney": 1, "distanceFromSource": 307, "platform": 3, "importance": "major"},
            {"stationName": "Kanpur Central", "stationCode": "CNB", "arrivalTime": "04:10", "departureTime": "04:20", "dayOfJourney": 2, "distanceFromSource": 561, "platform": 2, "importance": "major"},
            {"stationName": "Prayagraj Junction", "stationCode": "PRYJ", "arrivalTime": "06:35", "departureTime": "06:45", "dayOfJourney": 2, "distanceFromSource": 756, "platform": 4, "importance": "major"},
            {"stationName": "Pt. DD Upadhyaya Junction", "stationCode": "DDU", "arrivalTime": "09:10", "departureTime": "09:20", "dayOfJourney": 2, "distanceFromSource": 908, "platform": 6, "importance": "major"},
            {"stationName": "Buxar", "stationCode": "BXR", "arrivalTime": "11:02", "departureTime": "11:04", "dayOfJourney": 2, "distanceFromSource": 1002, "platform": 2, "importance": "minor"},
            {"stationName": "Ara Junction", "stationCode": "ARA", "arrivalTime": "11:55", "departureTime": "11:57", "dayOfJourney": 2, "distanceFromSource": 1071, "platform": 1, "importance": "junction"},
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "13:10", "departureTime": "Destination", "dayOfJourney": 2, "distanceFromSource": 1120, "platform": 5, "importance": "major"}
        ]
    },
    # Delhi to Patna
    {
        "trainNumber": "12310",
        "trainName": "New Delhi - Patna Rajdhani Express",
        "trainType": "Rajdhani",
        "runningDays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "quotaResetJunctions": ["CNB", "DDU"],
        "route": [
            {"stationName": "New Delhi", "stationCode": "NDLS", "arrivalTime": "Source", "departureTime": "16:55", "dayOfJourney": 1, "distanceFromSource": 0, "platform": 11, "importance": "major"},
            {"stationName": "Kanpur Central", "stationCode": "CNB", "arrivalTime": "22:20", "departureTime": "22:25", "dayOfJourney": 1, "distanceFromSource": 440, "platform": 2, "importance": "major"},
            {"stationName": "Prayagraj Junction", "stationCode": "PRYJ", "arrivalTime": "00:33", "departureTime": "00:35", "dayOfJourney": 2, "distanceFromSource": 635, "platform": 2, "importance": "major"},
            {"stationName": "Pt. DD Upadhyaya Junction", "stationCode": "DDU", "arrivalTime": "02:43", "departureTime": "02:53", "dayOfJourney": 2, "distanceFromSource": 787, "platform": 8, "importance": "major"},
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "05:55", "departureTime": "Destination", "dayOfJourney": 2, "distanceFromSource": 999, "platform": 2, "importance": "major"}
        ]
    },
    # Howrah to Patna
    {
        "trainNumber": "12023",
        "trainName": "Howrah - Patna Jan Shatabdi Express",
        "trainType": "Jan Shatabdi",
        "runningDays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "quotaResetJunctions": ["ASN", "JAJ"],
        "route": [
            {"stationName": "Howrah Junction", "stationCode": "HWH", "arrivalTime": "Source", "departureTime": "14:20", "dayOfJourney": 1, "distanceFromSource": 0, "platform": 12, "importance": "major"},
            {"stationName": "Durgapur", "stationCode": "DGR", "arrivalTime": "16:22", "departureTime": "16:24", "dayOfJourney": 1, "distanceFromSource": 159, "platform": 3, "importance": "junction"},
            {"stationName": "Asansol Junction", "stationCode": "ASN", "arrivalTime": "16:55", "departureTime": "17:05", "dayOfJourney": 1, "distanceFromSource": 201, "platform": 6, "importance": "major"},
            {"stationName": "Madhupur Junction", "stationCode": "MDP", "arrivalTime": "18:17", "departureTime": "18:19", "dayOfJourney": 1, "distanceFromSource": 282, "platform": 2, "importance": "junction"},
            {"stationName": "Jasidih Junction", "stationCode": "JSME", "arrivalTime": "18:48", "departureTime": "18:53", "dayOfJourney": 1, "distanceFromSource": 311, "platform": 2, "importance": "junction"},
            {"stationName": "Jhajha", "stationCode": "JAJ", "arrivalTime": "19:34", "departureTime": "19:39", "dayOfJourney": 1, "distanceFromSource": 355, "platform": 3, "importance": "major"},
            {"stationName": "Lakhisarai Junction", "stationCode": "LKR", "arrivalTime": "20:32", "departureTime": "20:34", "dayOfJourney": 1, "distanceFromSource": 410, "platform": 1, "importance": "junction"},
            {"stationName": "Mokama", "stationCode": "MKA", "arrivalTime": "21:05", "departureTime": "21:07", "dayOfJourney": 1, "distanceFromSource": 443, "platform": 2, "importance": "junction"},
            {"stationName": "Patna Sahib", "stationCode": "PNC", "arrivalTime": "22:13", "departureTime": "22:15", "dayOfJourney": 1, "distanceFromSource": 522, "platform": 2, "importance": "minor"},
            {"stationName": "Patna Junction", "stationCode": "PNBE", "arrivalTime": "22:30", "departureTime": "Destination", "dayOfJourney": 1, "distanceFromSource": 532, "platform": 3, "importance": "major"}
        ]
    }
]

# Generate availability for sample dates
sample_dates = ["2026-01-20", "2026-01-22", "2026-01-25", "2026-02-01", "2026-02-10"]

for train in all_trains:
    # Add availability for each sample date
    train["availability"] = {}
    for date in sample_dates:
        train["availability"].update(generate_availability(date, train["trainType"]))
    
    trains_database["trains"].append(train)

# Write to JSON file
with open("trains-database.json", "w", encoding="utf-8") as f:
    json.dump(trains_database, f, indent=2, ensure_ascii=False)

print("SUCCESS: Enhanced train database generated!")
print(f"   Total trains: {len(trains_database['trains'])}")
print(f"   Date range: {trains_database['meta']['validityPeriod']['start']} to {trains_database['meta']['validityPeriod']['end']}")
print(f"   File: trains-database.json")
