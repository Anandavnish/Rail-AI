# 🚂 RailSplit - AI-Powered Railway Split Journey Discovery

> Find confirmed train seats when direct tickets are unavailable by intelligently splitting journeys across intermediate stations

## Quick Start

1. **Open** `index.html` in your browser
2. **Search** for a route (e.g., Delhi → Mumbai)
3. **Discover** smart split journey options with confirmed seats

## What This Does

When IRCTC shows "Waitlist/REGRET" for direct trains, RailSplit:
- ✅ Breaks your journey into smaller segments
- ✅ Finds confirmed seats via intermediate junctions
- ✅ Suggests multi-train combinations
- ✅ Ranks routes by confirmation probability
- ✅ Shows detailed fare and timing breakdowns

## System Architecture

```
Railway Graph (40+ stations, 17 trains)
        ↓
Fake Inventory (Realistic seat simulation)
        ↓
Split Discovery Engine (Graph-based pathfinding)
        ↓
Beautiful Web Interface (Search + Results)
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern design with animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **Graph Theory** - Custom pathfinding algorithms

## File Structure

```
RailAI/
├── index.html              # Homepage with search
├── results.html            # Results display
├── styles.css              # Global styles
├── results.css             # Results page styles
└── js/
    ├── railwayGraph.js     # Network data
    ├── fakeInventory.js    # Seat simulation
    ├── splitEngine.js      # Core algorithm
    └── app.js              # UI logic
```

## Demo Features

- 🎯 Smart route discovery via intermediate junctions
- 📊 Confirmation probability scoring (85-95%)
- 💰 Complete fare breakdown per segment
- ⏱️ Journey time optimization
- 🚄 Multi-train transfer suggestions
- 📱 Fully responsive design

## For Event Presentation

**Best Demo Route**: Delhi (NDLS) → Mumbai Central (BCT)
- Direct trains will show WL
- System discovers 2-3 split options
- All with confirmed seat probability

## Project Philosophy

> "You're not building a ticket site. You're building an intelligent railway survival system."

This system treats Indian Railways as a graph problem, exploiting quota-reset junctions and segment-wise availability to find seats that appear "unavailable" in traditional full-route searches.

---

**Built for**: Railway enthusiasts, travelers, and event demonstration  
**Status**: Demo prototype (educational purposes)  
**Not affiliated with**: IRCTC or Indian Railways
