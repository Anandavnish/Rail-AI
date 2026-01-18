// Main Application Logic - Enhanced with Rich Metadata Display

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('travelDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Setup form submission
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  // Check if we're on results page
  const resultsContainer = document.getElementById('resultsContainer');
  if (resultsContainer) {
    displayResults();
  }
});

// Handle search form submission
function handleSearch(e) {
  e.preventDefault();

  const fromStation = document.getElementById('fromStation').value;
  const toStation = document.getElementById('toStation').value;
  const travelDate = document.getElementById('travelDate').value;
  const travelClass = document.getElementById('travelClass').value;
  const passengers = document.getElementById('passengers').value;

  // Validation
  if (!fromStation || !toStation || !travelDate || !travelClass) {
    alert('Please fill in all required fields');
    return;
  }

  if (fromStation === toStation) {
    alert('Origin and destination cannot be the same');
    return;
  }

  // Store search params in session storage
  const searchParams = {
    fromStation,
    toStation,
    travelDate,
    travelClass,
    passengers
  };

  sessionStorage.setItem('searchParams', JSON.stringify(searchParams));

  // Navigate to results page
  window.location.href = 'results.html';
}

// Display results on results page
function displayResults() {
  const searchParams = JSON.parse(sessionStorage.getItem('searchParams'));

  if (!searchParams) {
    window.location.href = 'index.html';
    return;
  }

  // Show search summary
  displaySearchSummary(searchParams);

  // For demo: force some popular routes to have WL direct trains
  const popularRoutes = [
    { from: 'NDLS', to: 'BCT' },
    { from: 'ND LS', to: 'CSMT' },
    { from: 'NDLS', to: 'HWH' },
    { from: 'ANVT', to: 'BCT' }
  ];

  if (popularRoutes.some(r => r.from === searchParams.fromStation && r.to === searchParams.toStation)) {
    // Force direct Rajdhani trains to WL to showcase split journey benefits
    forceWaitlist(['12952', '12954', '12302', '12434']);
  }

  // Perform search
  const date = new Date(searchParams.travelDate);
  const results = searchTrains(
    searchParams.fromStation,
    searchParams.toStation,
    searchParams.travelClass,
    date,
    true
  );

  // Display direct trains
  displayDirectTrains(results.directTrains, searchParams);

  // Display split journey options
  displaySplitJourneys(results.splitJourneys, searchParams);
}

// Display search summary
function displaySearchSummary(params) {
  const summaryEl = document.getElementById('searchSummary');
  if (!summaryEl) return;

  const fromName = stations[params.fromStation].name;
  const toName = stations[params.toStation].name;

  summaryEl.innerHTML = `
    <div class="search-summary-content">
      <div class="route-info">
        <h2>${fromName} → ${toName}</h2>
        <p>
          ${new Date(params.travelDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })} 
          | ${params.travelClass} | ${params.passengers} Passenger${params.passengers > 1 ? 's' : ''}
        </p>
      </div>
      <button onclick="window.location.href='index.html'" class="btn btn-secondary">
        🔄 New Search
      </button>
    </div>
  `;
}

// ENHANCED: Display direct trains with rich metadata
function displayDirectTrains(trains, params) {
  const container = document.getElementById('directTrainsContainer');
  if (!container) return;

  if (!trains || trains.length === 0) {
    container.innerHTML = '<div class="no-results">⚠️ No direct trains found for this route.</div>';
    return;
  }

  let html = '<div class="trains-list">';

  trains.forEach((train, index) => {
    const statusBadge = getStatusBadge(train.seatStatus);
    const isAvailable = train.seatStatus.status === 'CNF';

    // Generate mock platform number
    const platform = Math.floor(Math.random() * 10) + 1;

    // Generate mock coach composition
    const coaches = generateCoachComposition(train.class);

    // Calculate dynamic pricing (mock)
    const baseFare = train.fare;
    const tatkalSurcharge = Math.round(baseFare * 0.3);
    const dynamicFare = isAvailable ? baseFare : baseFare + tatkalSurcharge;

    html += `
      <div class="train-card ${isAvailable ? 'available' : 'unavailable'}">
        <div class="train-header">
          <div class="train-info">
            <h3>${train.trainName}</h3>
            <p class="train-number">#${train.trainNo}</p>
            <span class="train-type-badge">${train.trainType}</span>
          </div>
          <div class="train-status">
            ${statusBadge}
          </div>
        </div>
        
        <div class="train-route">
          <div class="station">
            <div class="station-code">${train.from.code}</div>
            <div class="station-time">${train.departure.time}</div>
            <div class="station-name">${train.from.name}</div>
            <div class="station-platform">Platform ${platform}</div>
          </div>
          
          <div class="journey-line">
            <div class="duration">⏱️ ${train.durationFormatted}</div>
            <div class="distance">📏 ${train.distance} km</div>
          </div>
          
          <div class="station">
            <div class="station-code">${train.to.code}</div>
            <div class="station-time">${train.arrival.time}${train.arrival.dayOffset || ''}</div>
            <div class="station-name">${train.to.name}</div>
            <div class="station-platform">Platform ${platform + 1}</div>
          </div>
        </div>
        
        <!-- ENHANCED: Rich Metadata Section -->
        <div class="train-metadata">
          <div class="metadata-item">
            <span class="label">Quota</span>
            <span class="value">General</span>
          </div>
          <div class="metadata-item">
            <span class="label">Coaches</span>
            <span class="value">${coaches}</span>
          </div>
          <div class="metadata-item">
            <span class="label">Avg Speed</span>
            <span class="value">${train.trainType === 'Rajdhani' ? '95 km/h' : train.trainType === 'Shatabdi' ? '90 km/h' : '70 km/h'}</span>
          </div>
          <div class="metadata-item">
            <span class="label">Availability</span>
            <span class="value ${isAvailable ? 'highlight' : ''}">${train.seatStatus.availability} Seats</span>
          </div>
        </div>
        
        <div class="train-footer">
          <div>
            <div class="fare">₹${dynamicFare.toLocaleString()}</div>
            <div class="fare-breakdown">${!isAvailable ? `Base: ₹${baseFare} + Tatkal: ₹${tatkalSurcharge}` : `Base Fare`}</div>
          </div>
          ${!isAvailable ? '<div class="unavailable-msg">⚡ Try Smart Split Below</div>' : '<div style="color: #00ff88; font-weight: 700;">✅ Book Now</div>'}
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

// Display split journey options
function displaySplitJourneys(splitJourneys, params) {
  const container = document.getElementById('splitJourneysContainer');
  if (!container) return;

  if (!splitJourneys || splitJourneys.length === 0) {
    container.innerHTML = '<div class="no-results">ℹ️ No additional split journey options available.</div>';
    return;
  }

  let html = '<div class="split-journeys-list">';

  splitJourneys.forEach((split, index) => {
    html += renderSplitJourneyCard(split, index);
  });

  html += '</div>';
  container.innerHTML = html;
}

// ENHANCED: Render split journey card with explanation of "leg"
function renderSplitJourneyCard(split, index) {
  const scoreBadge = getScoreBadge(split.summary.score);
  const probBadge = getProbabilityBadge(split.summary.confirmationProb);

  let html = `
    <div class="split-journey-card" id="split-${index}">
      <div class="split-header">
        <div class="split-title">
          <h3>Option ${index + 1}: ${split.totalLegs}-Leg Journey</h3>
          <div class="badges">
            ${scoreBadge}
            ${probBadge}
          </div>
        </div>
        <button class="btn-toggle" onclick="toggleSplitDetails(${index})">
          <span id="toggle-icon-${index}">▼</span> Details
        </button>
      </div>
      
      <div class="split-summary">
        <div class="summary-item">
          <span class="label">💰 Total Fare</span>
          <span class="value">${split.summary.totalFare}</span>
        </div>
        <div class="summary-item">
          <span class="label">⏱️ Journey Time</span>
          <span class="value">${split.summary.totalDuration}</span>
        </div>
        <div class="summary-item">
          <span class="label">🔄 Transfers</span>
          <span class="value">${split.totalLegs - 1}</span>
        </div>
        <div class="summary-item">
          <span class="label">🎯 Confirmation</span>
          <span class="value">${split.summary.confirmationProb}</span>
        </div>
      </div>
      
      <div class="split-details" id="details-${index}" style="display: none;">
        <div class="journey-timeline">
  `;

  split.journey.forEach((step, stepIndex) => {
    if (step.type === 'layover') {
      html += `
        <div class="layover-step">
          <div class="layover-icon">⏱️</div>
          <div class="layover-info">
            <strong>Transfer at ${step.station.name}</strong>
            <p>Layover: ${step.duration} | Change platforms and board next train</p>
          </div>
        </div>
      `;
    } else {
      // ENHANCED: Journey leg with explanation label
      const platform = Math.floor(Math.random() * 10) + 1;
      const coaches = generateCoachComposition(step.class);

      html += `
        <div class="journey-leg">
          <div class="leg-number">Leg ${step.legNumber}</div>
          
          <!-- EXPLANATION OF "LEG" -->
          <div class="leg-label">
            Journey Segment ${step.legNumber} of ${split.totalLegs} - Book this train separately
          </div>
          
          <div class="leg-train">
            <h4>${step.trainName} <span class="train-num">#${step.trainNo}</span></h4>
            <span class="train-type">${step.trainType}</span>
          </div>
          
          <div class="leg-route">
            <div class="leg-station">
              <strong>${step.from.name}</strong>
              <span>🕐 ${step.departure}</span>
              <span style="font-size: 0.75rem; color: #fffc00;">Platform ${platform}</span>
            </div>
            <div class="leg-arrow">→</div>
            <div class="leg-station">
              <strong>${step.to.name}</strong>
              <span>🕐 ${step.arrival}</span>
              <span style="font-size: 0.75rem; color: #fffc00;">Platform ${platform + 1}</span>
            </div>
          </div>
          
          <!-- ENHANCED: Detailed Leg Metadata -->
          <div class="leg-details">
            <div class="leg-detail-item">
              <div class="icon">📏</div>
              <div class="text">${step.distance}</div>
            </div>
            <div class="leg-detail-item">
              <div class="icon">⏱️</div>
              <div class="text">${step.duration}</div>
            </div>
            <div class="leg-detail-item">
              <div class="icon">💺</div>
              <div class="text">${step.seatStatus}</div>
            </div>
            <div class="leg-detail-item">
              <div class="icon">🚂</div>
              <div class="text">${coaches} Coaches</div>
            </div>
            <div class="leg-detail-item">
              <div class="icon">📋</div>
              <div class="text">Quota: GN</div>
            </div>
            <div class="leg-detail-item leg-fare">
              <div class="icon">💰</div>
              <div class="text">${step.fare}</div>
            </div>
          </div>
        </div>
      `;
    }
  });

  html += `
        </div>
      </div>
    </div>
  `;

  return html;
}

// Helper: Generate mock coach composition
function generateCoachComposition(travelClass) {
  const compositions = {
    'SL': '16-18',
    '3A': '12-14',
    '2A': '8-10',
    '1A': '4-6',
    'CC': '14-16'
  };
  return compositions[travelClass] || '12-14';
}

// Toggle split journey details
function toggleSplitDetails(index) {
  const details = document.getElementById(`details-${index}`);
  const icon = document.getElementById(`toggle-icon-${index}`);

  if (details.style.display === 'none') {
    details.style.display = 'block';
    icon.textContent = '▲';
  } else {
    details.style.display = 'none';
    icon.textContent = '▼';
  }
}

// Get status badge HTML
function getStatusBadge(seatStatus) {
  const status = seatStatus.status;
  const value = seatStatus.availability;

  if (status === 'CNF') {
    return `<span class="badge badge-success">✓ ${status} ${value}</span>`;
  } else if (status === 'RAC') {
    return `<span class="badge badge-warning">⚠ ${status} ${value}</span>`;
  } else {
    return `<span class="badge badge-danger">✗ ${status} ${value}</span>`;
  }
}

// Get score badge
function getScoreBadge(score) {
  if (score >= 80) {
    return `<span class="badge badge-success">⭐ Score: ${score}/100</span>`;
  } else if (score >= 60) {
    return `<span class="badge badge-info">Score: ${score}/100</span>`;
  } else {
    return `<span class="badge badge-warning">Score: ${score}/100</span>`;
  }
}

// Get probability badge
function getProbabilityBadge(prob) {
  const probNum = parseInt(prob);
  if (probNum >= 80) {
    return `<span class="badge badge-success">🎯 ${prob} Confirmation</span>`;
  } else if (probNum >= 50) {
    return `<span class="badge badge-info">🎯 ${prob} Confirmation</span>`;
  } else {
    return `<span class="badge badge-warning">🎯 ${prob} Confirmation</span>`;
  }
}
