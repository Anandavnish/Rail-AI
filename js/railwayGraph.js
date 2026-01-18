// Railway Graph Data - North India Network
// Station nodes with metadata for split journey discovery

const stations = {
    // Delhi NCR
    'NDLS': { name: 'New Delhi', state: 'Delhi', city: 'Delhi', isJunction: true, quotaReset: true, lat: 28.6431, lng: 77.2197 },
    'DLI': { name: 'Delhi', state: 'Delhi', city: 'Delhi', isJunction: true, quotaReset: true, lat: 28.6631, lng: 77.2334 },
    'NZM': { name: 'Hazrat Nizamuddin', state: 'Delhi', city: 'Delhi', isJunction: true, quotaReset: true, lat: 28.5877, lng: 77.2502 },
    'ANVT': { name: 'Anand Vihar Terminal', state: 'Delhi', city: 'Delhi', isJunction: true, quotaReset: true, lat: 28.6469, lng: 77.3164 },
    'GGN': { name: 'Gurgaon', state: 'Haryana', city: 'Gurgaon', isJunction: false, quotaReset: false, lat: 28.4595, lng: 77.0266 },

    // Rajasthan
    'JP': { name: 'Jaipur', state: 'Rajasthan', city: 'Jaipur', isJunction: true, quotaReset: true, lat: 26.9124, lng: 75.7873 },
    'AII': { name: 'Ajmer Jn', state: 'Rajasthan', city: 'Ajmer', isJunction: true, quotaReset: true, lat: 26.4499, lng: 74.6399 },
    'KOTA': { name: 'Kota Jn', state: 'Rajasthan', city: 'Kota', isJunction: true, quotaReset: true, lat: 25.1821, lng: 75.8342 },
    'RTM': { name: 'Ratlam Jn', state: 'Madhya Pradesh', city: 'Ratlam', isJunction: true, quotaReset: true, lat: 23.3315, lng: 75.0367 },

    // Uttar Pradesh
    'AGC': { name: 'Agra Cantt', state: 'Uttar Pradesh', city: 'Agra', isJunction: true, quotaReset: true, lat: 27.1767, lng: 78.0081 },
    'GWL': { name: 'Gwalior', state: 'Madhya Pradesh', city: 'Gwalior', isJunction: true, quotaReset: true, lat: 26.2183, lng: 78.1828 },
    'JHS': { name: 'Jhansi Jn', state: 'Uttar Pradesh', city: 'Jhansi', isJunction: true, quotaReset: true, lat: 25.4484, lng: 78.5685 },
    'ALJN': { name: 'Aligarh Jn', state: 'Uttar Pradesh', city: 'Aligarh', isJunction: true, quotaReset: true, lat: 27.8974, lng: 78.0880 },
    'CNB': { name: 'Kanpur Central', state: 'Uttar Pradesh', city: 'Kanpur', isJunction: true, quotaReset: true, lat: 26.4499, lng: 80.3319 },
    'LKO': { name: 'Lucknow (Charbagh/Nr)', state: 'Uttar Pradesh', city: 'Lucknow', isJunction: true, quotaReset: true, lat: 26.8467, lng: 80.9462 },
    'ALD': { name: 'Prayagraj Junction', state: 'Uttar Pradesh', city: 'Prayagraj', isJunction: true, quotaReset: true, lat: 25.4358, lng: 81.8463 },
    'PRYJ': { name: 'Prayagraj Junction', state: 'Uttar Pradesh', city: 'Prayagraj', isJunction: true, quotaReset: true, lat: 25.4358, lng: 81.8463 },
    'BSB': { name: 'Varanasi Junction', state: 'Uttar Pradesh', city: 'Varanasi', isJunction: true, quotaReset: true, lat: 25.3176, lng: 82.9739 },
    'MB': { name: 'Moradabad', state: 'Uttar Pradesh', city: 'Moradabad', isJunction: true, quotaReset: true, lat: 28.8389, lng: 78.7378 },
    'GKP': { name: 'Gorakhpur', state: 'Uttar Pradesh', city: 'Gorakhpur', isJunction: true, quotaReset: true, lat: 26.7606, lng: 83.3732 },
    'AYC': { name: 'Ayodhya Cantt/Dham', state: 'Uttar Pradesh', city: 'Ayodhya', isJunction: true, quotaReset: true, lat: 26.7922, lng: 82.2047 },
    'KGM': { name: 'Kathgodam', state: 'Uttarakhand', city: 'Kathgodam', isJunction: false, quotaReset: false, lat: 29.2644, lng: 79.5070 },
    'DDN': { name: 'Dehradun', state: 'Uttarakhand', city: 'Dehradun', isJunction: true, quotaReset: true, lat: 30.3165, lng: 78.0322 },

    // Madhya Pradesh
    'BPL': { name: 'Bhopal Jn', state: 'Madhya Pradesh', city: 'Bhopal', isJunction: true, quotaReset: true, lat: 23.2599, lng: 77.4126 },
    'ET': { name: 'Itarsi Jn', state: 'Madhya Pradesh', city: 'Itarsi', isJunction: true, quotaReset: true, lat: 22.6147, lng: 77.7638 },
    'JBP': { name: 'Jabalpur', state: 'Madhya Pradesh', city: 'Jabalpur', isJunction: true, quotaReset: true, lat: 23.1815, lng: 79.9864 },

    // Gujarat & Maharashtra
    'ADI': { name: 'Ahmedabad Jn', state: 'Gujarat', city: 'Ahmedabad', isJunction: true, quotaReset: true, lat: 23.0225, lng: 72.5714 },
    'ST': { name: 'Surat', state: 'Gujarat', city: 'Surat', isJunction: true, quotaReset: true, lat: 21.1702, lng: 72.8311 },
    'BRC': { name: 'Vadodara Jn', state: 'Gujarat', city: 'Vadodara', isJunction: true, quotaReset: true, lat: 22.3072, lng: 73.1812 },
    'NDBD': { name: 'Nandurbar', state: 'Maharashtra', city: 'Nandurbar', isJunction: false, quotaReset: false, lat: 21.3698, lng: 74.2433 },
    'BSL': { name: 'Bhusaval Jn', state: 'Maharashtra', city: 'Bhusaval', isJunction: true, quotaReset: true, lat: 21.0444, lng: 75.7849 },
    'IGP': { name: 'Igatpuri', state: 'Maharashtra', city: 'Nashik', isJunction: true, quotaReset: false, lat: 19.6958, lng: 73.5631 },
    'KYN': { name: 'Kalyan Jn', state: 'Maharashtra', city: 'Kalyan', isJunction: true, quotaReset: true, lat: 19.2403, lng: 73.1305 },
    'CSMT': { name: 'Mumbai CST', state: 'Maharashtra', city: 'Mumbai', isJunction: true, quotaReset: true, lat: 18.9398, lng: 72.8355 },
    'BCT': { name: 'Mumbai Central', state: 'Maharashtra', city: 'Mumbai', isJunction: true, quotaReset: true, lat: 18.9685, lng: 72.8197 },
    'BDTS': { name: 'Bandra Terminus', state: 'Maharashtra', city: 'Mumbai', isJunction: true, quotaReset: true, lat: 19.0544, lng: 72.8406 },
    'LTT': { name: 'Lokmanya Tilak T', state: 'Maharashtra', city: 'Mumbai', isJunction: true, quotaReset: true, lat: 19.0688, lng: 72.8856 },
    'PUNE': { name: 'Pune Jn', state: 'Maharashtra', city: 'Pune', isJunction: true, quotaReset: true, lat: 18.5204, lng: 73.8567 },
    'NGP': { name: 'Nagpur', state: 'Maharashtra', city: 'Nagpur', isJunction: true, quotaReset: true, lat: 21.1458, lng: 79.0882 },

    // Bihar & West Bengal & Punjab
    'PNBE': { name: 'Patna Junction', state: 'Bihar', city: 'Patna', isJunction: true, quotaReset: true, lat: 25.5941, lng: 85.1376 },
    'RJPB': { name: 'Rajendra Nagar Terminal', state: 'Bihar', city: 'Patna', isJunction: true, quotaReset: true, lat: 25.6093, lng: 85.1854 },
    'PPTA': { name: 'Patliputra Junction', state: 'Bihar', city: 'Patna', isJunction: true, quotaReset: true, lat: 25.5726, lng: 85.1052 },
    'MGS': { name: 'Mughal Sarai Jn', state: 'Uttar Pradesh', city: 'Chandauli', isJunction: true, quotaReset: true, lat: 25.2820, lng: 83.1193 },
    'DDU': { name: 'Pt. DD Upadhyaya Junction', state: 'Uttar Pradesh', city: 'Chandauli', isJunction: true, quotaReset: true, lat: 25.2820, lng: 83.1193 },
    'GAYA': { name: 'Gaya Jn', state: 'Bihar', city: 'Gaya', isJunction: true, quotaReset: true, lat: 24.7955, lng: 84.9994 },
    'BGP': { name: 'Bhagalpur', state: 'Bihar', city: 'Bhagalpur', isJunction: true, quotaReset: true, lat: 25.2527, lng: 86.9842 },
    'DBG': { name: 'Darbhanga', state: 'Bihar', city: 'Darbhanga', isJunction: true, quotaReset: true, lat: 26.1584, lng: 85.8949 },
    'MFP': { name: 'Muzaffarpur', state: 'Bihar', city: 'Muzaffarpur', isJunction: true, quotaReset: true, lat: 26.1225, lng: 85.3906 },
    'RXL': { name: 'Raxaul', state: 'Bihar', city: 'Raxaul', isJunction: false, quotaReset: false, lat: 26.9779, lng: 84.8509 },
    'SHC': { name: 'Saharsa', state: 'Bihar', city: 'Saharsa', isJunction: true, quotaReset: true, lat: 25.8804, lng: 86.5960 },
    'BJU': { name: 'Barauni', state: 'Bihar', city: 'Barauni', isJunction: true, quotaReset: true, lat: 25.4763, lng: 86.0615 },
    'JYG': { name: 'Jaynagar', state: 'Bihar', city: 'Jaynagar', isJunction: false, quotaReset: false, lat: 26.5900, lng: 86.1400 },
    'DHN': { name: 'Dhanbad Jn', state: 'Jharkhand', city: 'Dhanbad', isJunction: true, quotaReset: true, lat: 23.7957, lng: 86.4304 },
    'ASN': { name: 'Asansol Jn', state: 'West Bengal', city: 'Asansol', isJunction: true, quotaReset: true, lat: 23.6739, lng: 86.9923 },
    'HWH': { name: 'Howrah', state: 'West Bengal', city: 'Kolkata', isJunction: true, quotaReset: true, lat: 22.5726, lng: 88.3639 },
    'SDAH': { name: 'Sealdah', state: 'West Bengal', city: 'Kolkata', isJunction: true, quotaReset: true, lat: 22.5726, lng: 88.3639 },
    'GHY': { name: 'Guwahati', state: 'Assam', city: 'Guwahati', isJunction: true, quotaReset: true, lat: 26.1445, lng: 91.7362 },

    // Punjab & Jammu
    'UMB': { name: 'Ambala Cantt', state: 'Haryana', city: 'Ambala', isJunction: true, quotaReset: true, lat: 30.3600, lng: 76.8346 },
    'LDH': { name: 'Ludhiana', state: 'Punjab', city: 'Ludhiana', isJunction: true, quotaReset: true, lat: 30.9010, lng: 75.8573 },
    'ASR': { name: 'Amritsar', state: 'Punjab', city: 'Amritsar', isJunction: true, quotaReset: true, lat: 31.6340, lng: 74.8723 },
    'JAT': { name: 'Jammu Tawi', state: 'Jammu & Kashmir', city: 'Jammu', isJunction: true, quotaReset: true, lat: 32.7266, lng: 74.8570 },
    'SVDK': { name: 'SMVD Katra', state: 'Jammu & Kashmir', city: 'Katra', isJunction: false, quotaReset: false, lat: 32.9920, lng: 74.9310 },

    // South India (Major Junctions)
    'BZA': { name: 'Vijayawada Jn', state: 'Andhra Pradesh', city: 'Vijayawada', isJunction: true, quotaReset: true, lat: 16.5062, lng: 80.6480 },
    'MAS': { name: 'Chennai Central', state: 'Tamil Nadu', city: 'Chennai', isJunction: true, quotaReset: true, lat: 13.0827, lng: 80.2707 },
    'BNC': { name: 'Bangalore City', state: 'Karnataka', city: 'Bangalore', isJunction: true, quotaReset: true, lat: 12.9716, lng: 77.5946 },
    'SBC': { name: 'KSR Bangalore', state: 'Karnataka', city: 'Bangalore', isJunction: true, quotaReset: true, lat: 12.9716, lng: 77.5946 }
};

// Major trains with route information and split usefulness tags
const trains = [
    // Delhi - Jaipur Corridor
    {
        trainNo: '12015',
        trainName: 'Ajmer Shatabdi',
        type: 'Shatabdi',
        route: ['NDLS', 'GGN', 'JP', 'AII'],
        classes: ['CC', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 90
    },
    {
        trainNo: '12958',
        trainName: 'Ajmer SF Express',
        type: 'Superfast',
        route: ['ANVT', 'JP', 'AII'],
        classes: ['SL', '3A', '2A', '1A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 75
    },
    {
        trainNo: '12413',
        trainName: 'Jaipur AC SF',
        type: 'Superfast',
        route: ['NDLS', 'JP'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'medium',
        frequency: 'Daily',
        avgSpeed: 80
    },

    // Delhi - Agra - Jhansi - Bhopal Corridor
    {
        trainNo: '12002',
        trainName: 'Bhopal Shatabdi',
        type: 'Shatabdi',
        route: ['NDLS', 'AGC', 'GWL', 'JHS', 'BPL'],
        classes: ['CC', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily Ex Sun',
        avgSpeed: 95
    },
    {
        trainNo: '12138',
        trainName: 'Punjab Mail',
        type: 'Mail',
        route: ['NDLS', 'AGC', 'JHS', 'BPL', 'ET', 'NGP', 'BSL', 'IGP', 'KYN', 'CSMT'],
        classes: ['SL', '3A', '2A', '1A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 70
    },

    // Delhi - Kota - Mumbai Corridor
    {
        trainNo: '12952',
        trainName: 'Mumbai Rajdhani',
        type: 'Rajdhani',
        route: ['NDLS', 'KOTA', 'RTM', 'BRC', 'ST', 'BCT'],
        classes: ['3A', '2A', '1A'],
        splitUsefulness: 'medium',
        frequency: 'Daily',
        avgSpeed: 100
    },
    {
        trainNo: '12954',
        trainName: 'August Kranti Rajdhani',
        type: 'Rajdhani',
        route: ['NDLS', 'KOTA', 'BRC', 'ST', 'BCT'],
        classes: ['3A', '2A', '1A'],
        splitUsefulness: 'medium',
        frequency: 'Daily',
        avgSpeed: 105
    },
    {
        trainNo: '22925',
        trainName: 'Paschim Express',
        type: 'Superfast',
        route: ['NDLS', 'JP', 'AII', 'KOTA', 'BRC', 'ST', 'BCT'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 72
    },

    // Jhansi - Mumbai Corridor
    {
        trainNo: '12106',
        trainName: 'Vidarbha SF Express',
        type: 'Superfast',
        route: ['JHS', 'BPL', 'ET', 'NGP', 'BSL', 'IGP', 'CSMT'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 68
    },

    // Delhi - Kanpur - Patna - Kolkata Corridor (MAIN ROUTE FOR SPLIT DEMOS)
    {
        trainNo: '12302',
        trainName: 'Rajdhani Express (HWH)',
        type: 'Rajdhani',
        route: ['NDLS', 'CNB', 'PRYJ', 'DDU', 'PNBE', 'DHN', 'ASN', 'HWH'],
        classes: ['3A', '2A', '1A'],
        splitUsefulness: 'medium',
        frequency: 'Daily',
        avgSpeed: 95
    },
    {
        trainNo: '12304',
        trainName: 'Poorva Express',
        type: 'Superfast',
        route: ['NDLS', 'ALJN', 'CNB', 'PRYJ', 'BSB', 'DDU', 'PNBE', 'HWH'],
        classes: ['SL', '3A', '2A', '1A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 72
    },
    {
        trainNo: '12382',
        trainName: 'Poorva Express',
        type: 'Superfast',
        route: ['NDLS', 'ALJN', 'CNB', 'PRYJ', 'BSB', 'MGS', 'PNBE', 'HWH'],
        classes: ['SL', '3A', '2A', '1A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 72
    },

    // Delhi - Patna Direct Trains
    {
        trainNo: '12393',
        trainName: 'Sampoorna Kranti Express',
        type: 'Superfast',
        route: ['RJPB', 'DDU', 'CNB', 'NDLS'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 78
    },
    {
        trainNo: '12309',
        trainName: 'Rajendra Nagar Rajdhani',
        type: 'Rajdhani',
        route: ['RJPB', 'DDU', 'PRYJ', 'CNB', 'NDLS'],
        classes: ['3A', '2A', '1A'],
        splitUsefulness: 'medium',
        frequency: 'Daily',
        avgSpeed: 88
    },
    {
        trainNo: '12423',
        trainName: 'Dibrugarh Rajdhani',
        type: 'Rajdhani',
        route: ['PNBE', 'DDU', 'CNB', 'NDLS'],
        classes: ['3A', '2A', '1A'],
        splitUsefulness: 'medium',
        frequency: 'Daily',
        avgSpeed: 90
    },
    {
        trainNo: '20801',
        trainName: 'Magadh Express',
        type: 'Superfast',
        route: ['NDLS', 'CNB', 'DDU', 'PNBE'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 70
    },

    // Kanpur - Patna Connector Trains (for split journeys)
    {
        trainNo: '12295',
        trainName: 'Sanghamitra Express',
        type: 'Superfast',
        route: ['DDU', 'PNBE', 'DHN', 'HWH'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 65
    },
    {
        trainNo: '13019',
        trainName: 'Bagh Express',
        type: 'Express',
        route: ['CNB', 'PRYJ', 'BSB', 'DDU', 'PNBE'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 60
    },

    // Delhi - Lucknow - Gorakhpur Corridor
    {
        trainNo: '12553',
        trainName: 'Vaishali Express',
        type: 'Superfast',
        route: ['NDLS', 'CNB', 'LKO', 'GKP'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 73
    },
    {
        trainNo: '12391',
        trainName: 'Shramjeevi Express',
        type: 'Superfast',
        route: ['NDLS', 'MB', 'LKO', 'BSB', 'PNBE'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 68
    },
    {
        trainNo: '12565',
        trainName: 'Bihar Sampark Kranti',
        type: 'Superfast',
        route: ['NDLS', 'CNB', 'GKP', 'DBG'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 70
    },
    {
        trainNo: '12003',
        trainName: 'Lucknow Shatabdi',
        type: 'Shatabdi',
        route: ['NDLS', 'CNB', 'LKO'],
        classes: ['CC', 'EC'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 92
    },

    // Delhi - Varanasi Vande Bharat
    {
        trainNo: '22435',
        trainName: 'Vande Bharat (NDLS-BSB)',
        type: 'Vande Bharat',
        route: ['NDLS', 'CNB', 'PRYJ', 'BSB'],
        classes: ['CC', 'EC'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 110
    },

    // ANVT - Patna via Eastern Corridor
    {
        trainNo: '12367',
        trainName: 'Vikramshila Express',
        type: 'Superfast',
        route: ['ANVT', 'CNB', 'DDU', 'PNBE', 'BGP'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 67
    },
    {
        trainNo: '12505',
        trainName: 'North East Express',
        type: 'Superfast',
        route: ['ANVT', 'CNB', 'DDU', 'PPTA'],
        classes: ['SL', '3A', '2A', '1A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 69
    },
    {
        trainNo: '12487',
        trainName: 'Seemanchal Express',
        type: 'Superfast',
        route: ['ANVT', 'CNB', 'DDU', 'PPTA'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 66
    },

    // Patna - Kolkata Corridor
    {
        trainNo: '12334',
        trainName: 'Vibhuti Express',
        type: 'Superfast',
        route: ['PNBE', 'GAYA', 'MGS', 'DHN', 'ASN', 'HWH'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 65
    },
    {
        trainNo: '13007',
        trainName: 'Howrah Mail',
        type: 'Mail',
        route: ['PNBE', 'DHN', 'ASN', 'HWH'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 58
    },

    // Mumbai - Kolkata Corridor
    {
        trainNo: '12810',
        trainName: 'HWH Mumbai Mail',
        type: 'Mail',
        route: ['CSMT', 'IGP', 'BSL', 'NGP', 'JBP', 'PRYJ', 'MGS', 'HWH'],
        classes: ['SL', '3A', '2A', '1A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 62
    },

    // Delhi - Chennai Corridor
    {
        trainNo: '12434',
        trainName: 'Chennai Rajdhani',
        type: 'Rajdhani',
        route: ['NDLS', 'AGC', 'JHS', 'BPL', 'NGP', 'BZA', 'MAS'],
        classes: ['3A', '2A', '1A'],
        splitUsefulness: 'medium',
        frequency: 'Daily',
        avgSpeed: 85
    },

    // Delhi - Bangalore Corridor
    {
        trainNo: '12430',
        trainName: 'Bangalore Rajdhani',
        type: 'Rajdhani',
        route: ['NDLS', 'KOTA', 'BPL', 'NGP', 'SBC'],
        classes: ['3A', '2A', '1A'],
        splitUsefulness: 'medium',
        frequency: 'Weekly',
        avgSpeed: 80
    },

    // Additional Popular Routes for Split Options
    {
        trainNo: '12956',
        trainName: 'Jaipur SF',
        type: 'Superfast',
        route: ['BCT', 'BRC', 'RTM', 'KOTA', 'JP'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 70
    },
    {
        trainNo: '12916',
        trainName: 'Ashram Express',
        type: 'Express',
        route: ['BCT', 'BRC', 'RTM', 'KOTA', 'GGN', 'DLI'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 65
    },
    {
        trainNo: '12780',
        trainName: 'Goa Express',
        type: 'Superfast',
        route: ['NZM', 'KOTA', 'RTM', 'BRC', 'ST'],
        classes: ['SL', '3A', '2A', '1A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 72
    },

    // Brahmaputra Mail - linking Delhi to Assam via Patna
    {
        trainNo: '15657',
        trainName: 'Brahmaputra Mail',
        type: 'Mail',
        route: ['DLI', 'CNB', 'DDU', 'PNBE', 'GHY'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 60
    },

    // Lucknow - Patna Connector
    {
        trainNo: '12229',
        trainName: 'Lucknow Mail',
        type: 'Mail',
        route: ['NDLS', 'MB', 'LKO'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 68
    },
    {
        trainNo: '12557',
        trainName: 'Sapt Kranti Express',
        type: 'Superfast',
        route: ['ANVT', 'MB', 'LKO', 'GKP'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'high',
        frequency: 'Daily',
        avgSpeed: 71
    },

    // Kota connectors for splits
    {
        trainNo: '12465',
        trainName: 'Ranthambore Express',
        type: 'Superfast',
        route: ['NDLS', 'KOTA', 'BPL'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 75
    },
    {
        trainNo: '12903',
        trainName: 'Golden Temple Mail',
        type: 'Mail',
        route: ['BCT', 'BRC', 'KOTA', 'NDLS', 'ASR'],
        classes: ['SL', '3A', '2A'],
        splitUsefulness: 'very-high',
        frequency: 'Daily',
        avgSpeed: 67
    }
];

// Travel corridors - major routes for split journey analysis
const corridors = {
    'Delhi-Mumbai': {
        mainRoute: ['NDLS', 'KOTA', 'RTM', 'BRC', 'ST', 'BCT'],
        alternateRoutes: [
            ['NDLS', 'AGC', 'JHS', 'BPL', 'NGP', 'BSL', 'IGP', 'CSMT'],
            ['NDLS', 'JP', 'AII', 'RTM', 'BRC', 'BCT']
        ],
        keyJunctions: ['KOTA', 'JHS', 'BPL', 'RTM', 'BRC'],
        priority: 'very-high'
    },
    'Delhi-Kolkata': {
        mainRoute: ['NDLS', 'CNB', 'ALD', 'MGS', 'PNBE', 'DHN', 'ASN', 'HWH'],
        alternateRoutes: [
            ['NDLS', 'ALJN', 'CNB', 'ALD', 'BSB', 'MGS', 'HWH']
        ],
        keyJunctions: ['CNB', 'ALD', 'MGS', 'PNBE'],
        priority: 'high'
    },
    'Delhi-Jaipur': {
        mainRoute: ['NDLS', 'GGN', 'JP'],
        alternateRoutes: [
            ['NDLS', 'JP', 'AII']
        ],
        keyJunctions: ['JP'],
        priority: 'high'
    },
    'Delhi-Chennai': {
        mainRoute: ['NDLS', 'AGC', 'JHS', 'BPL', 'NGP', 'BZA', 'MAS'],
        alternateRoutes: [],
        keyJunctions: ['JHS', 'BPL', 'NGP', 'BZA'],
        priority: 'medium'
    }
};

// Distance matrix (in kilometers) - for fare calculation
const distances = {
    'NDLS-GGN': 30,
    'NDLS-JP': 308,
    'NDLS-AGC': 199,
    'AGC-GWL': 118,
    'GWL-JHS': 101,
    'JHS-BPL': 301,
    'BPL-ET': 120,
    'NDLS-KOTA': 465,
    'KOTA-RTM': 363,
    'RTM-BRC': 119,
    'BRC-ST': 131,
    'ST-BCT': 264,
    'NDLS-CNB': 441,
    'CNB-ALD': 195,
    'ALD-MGS': 135,
    'MGS-PNBE': 168,
    'PNBE-DHN': 255,
    'DHN-ASN': 67,
    'ASN-HWH': 213,
    'JHS-NGP': 466,
    'NGP-BSL': 339,
    'BSL-IGP': 351,
    'IGP-CSMT': 121
};

// Helper function to calculate distance between two stations
function getDistance(from, to) {
    const key1 = `${from}-${to}`;
    const key2 = `${to}-${from}`;

    if (distances[key1]) return distances[key1];
    if (distances[key2]) return distances[key2];

    // If direct distance not available, calculate approximate using lat/lng
    const station1 = stations[from];
    const station2 = stations[to];

    if (station1 && station2) {
        const R = 6371; // Earth's radius in km
        const dLat = (station2.lat - station1.lat) * Math.PI / 180;
        const dLon = (station2.lng - station1.lng) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(station1.lat * Math.PI / 180) * Math.cos(station2.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    }

    return 0;
}

// Helper function to get all trains between two stations
function getTrainsBetween(from, to) {
    return trains.filter(train => {
        const fromIndex = train.route.indexOf(from);
        const toIndex = train.route.indexOf(to);
        return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });
}

// Helper function to find intermediate junctions
function getIntermediateJunctions(from, to) {
    const junctions = [];
    const relevantTrains = getTrainsBetween(from, to);

    relevantTrains.forEach(train => {
        const fromIdx = train.route.indexOf(from);
        const toIdx = train.route.indexOf(to);

        for (let i = fromIdx + 1; i < toIdx; i++) {
            const stationCode = train.route[i];
            const station = stations[stationCode];
            if (station && station.isJunction && station.quotaReset) {
                if (!junctions.includes(stationCode)) {
                    junctions.push(stationCode);
                }
            }
        }
    });

    return junctions;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stations,
        trains,
        corridors,
        distances,
        getDistance,
        getTrainsBetween,
        getIntermediateJunctions
    };
}
