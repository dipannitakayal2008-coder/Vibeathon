# DisplaceOS

DisplaceOS is a browser-local disaster relief coordination demonstration. It connects incident triage, relief camp stock, resource allocation, response-team tasks, alerts, analytics, and hazard simulations through one persisted local dataset.

## Run

No package installation or environment variables are required. Open `index.html` directly in a modern browser, or use the VS Code Live Server extension if you already have it installed. The app uses browser `localStorage`; opening it from a different browser profile creates a separate dataset.

The Google Fonts import is optional visual enhancement. If the network is unavailable, the app falls back to local system fonts. The situation map is a labeled illustrative schematic with simulated coordinates; it does not use live map tiles, GPS, or live response feeds.

## Demonstration

1. Open Command center and review the seeded North District records.
2. Open Simulation lab and run Flood event. The shared dataset gains two incidents, camp stocks change, shortage/incident alerts are created, an available team is assigned when possible, and the map/metrics refresh.
3. Open an incident to inspect the deterministic score, factor contributions, recommended next step, and optional reason-recorded priority override.
4. Open Relief camps to inspect capacity and shortage thresholds.
5. Open Resource coordination, review a recommendation, and confirm an allocation. The central inventory and camp stock update together; quantities above available stock are rejected.
6. Assign or update a response team, then resolve an incident and inspect the activity and alerts.
7. Use Reset demonstration data in Simulation lab to restore the seeded baseline. Reset requires confirmation.

The Administrator, Responder, Camp manager, and Volunteer selector controls frontend demonstration permissions only. They are not authentication or server-side authorization.

## Important limits

- All records are local demonstration data. There is no backend, central server, multi-user synchronization, authentication, or production authorization.
- There is no server submission queue or sync retry. Browser persistence allows the demonstration UI to continue offline, but a report saved here has not been sent to a response organization.
- Map positions are simulated/illustrative. No emergency services, paid API, GPS, route-distance model, or real facility directory is connected.
- Priority weights and allocation recommendations are demonstration logic, not a validated emergency-response protocol. Human responders remain responsible for decisions.
- Historical incoming/resolved values are seeded demonstration series; live operational metrics derive from the current local records.
- Local storage is not a secure store for sensitive reporter details. Do not enter real personal or emergency data.

## Validation

`node --check app.js` checks application JavaScript syntax. Main workflows were also exercised in a browser: simulation/reset, incident creation and scoring, team assignment and resolution, allocation rejection/confirmation, refresh persistence, role selection, and a mobile-width render.