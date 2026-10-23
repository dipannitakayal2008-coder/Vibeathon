(() => {
  const STORAGE_KEY = 'displaceos.demo.v1';
  const RESOURCES = [
    { id: 'water', label: 'Drinking water', unit: 'cases', threshold: 120 },
    { id: 'food', label: 'Food packs', unit: 'packs', threshold: 100 },
    { id: 'medical', label: 'Medical kits', unit: 'kits', threshold: 25 },
    { id: 'blankets', label: 'Blankets', unit: 'units', threshold: 70 },
    { id: 'supplies', label: 'Essential supplies', unit: 'boxes', threshold: 45 },
  ];
  const ROLE_PERMISSIONS = {
    Administrator: ['incident.create', 'incident.edit', 'incident.resolve', 'team.assign', 'team.update', 'camp.update', 'allocation.confirm', 'simulation.run', 'simulation.reset'],
    Responder: ['incident.create', 'incident.edit', 'incident.resolve', 'team.assign', 'team.update'],
    'Camp manager': ['camp.update', 'allocation.confirm'],
    Volunteer: ['incident.create'],
  };
  const now = Date.now();
  const ago = (hours) => new Date(now - hours * 3600000).toISOString();
  const freshData = () => ({
    role: 'Administrator',
    incidents: [
      { id: 'INC-2401', title: 'Families trapped near east levee', description: 'Rising water has cut off the lower road. Two households report mobility needs.', category: 'Flood', location: 'East Levee, Northbank', x: 69, y: 31, affected: 28, urgency: 5, medical: 4, vulnerable: true, waitHours: 3.2, supplies: { water: 80, food: 35, medical: 4, blankets: 18, supplies: 8 }, reportedAt: ago(3.2), teamId: 'TEAM-02', status: 'Assigned', medicalRequirements: 'Insulin and mobility support', override: null, scenarioId: null },
      { id: 'INC-2398', title: 'Urgent medicine delivery', description: 'Clinic stock is low after access was interrupted by the storm.', category: 'Flood', location: 'Riverside Clinic, Northbank', x: 56, y: 42, affected: 17, urgency: 4, medical: 5, vulnerable: true, waitHours: 5.7, supplies: { water: 20, food: 0, medical: 18, blankets: 0, supplies: 3 }, reportedAt: ago(5.7), teamId: null, status: 'Open', medicalRequirements: 'Insulin, antibiotics, wound-care kits', override: null, scenarioId: null },
      { id: 'INC-2394', title: 'Roof access requested at school', description: 'Residents sheltering on the upper floor; road access remains passable.', category: 'Flood', location: 'Northbank Primary School', x: 42, y: 35, affected: 46, urgency: 3, medical: 2, vulnerable: true, waitHours: 8.5, supplies: { water: 100, food: 70, medical: 2, blankets: 40, supplies: 10 }, reportedAt: ago(8.5), teamId: 'TEAM-01', status: 'Assigned', medicalRequirements: 'One resident needs a mobility assessment', override: null, scenarioId: null },
      { id: 'INC-2387', title: 'Road debris and blocked access', description: 'Debris has restricted vehicle access to the hill road.', category: 'Landslide', location: 'Quarry Road, West Ridge', x: 23, y: 66, affected: 9, urgency: 2, medical: 1, vulnerable: false, waitHours: 12, supplies: { water: 10, food: 15, medical: 0, blankets: 4, supplies: 20 }, reportedAt: ago(12), teamId: null, status: 'Open', medicalRequirements: 'None reported', override: null, scenarioId: null },
      { id: 'INC-2371', title: 'Welfare check completed', description: 'All residents accounted for; basic supplies delivered.', category: 'Earthquake', location: 'Civic Center, Old Town', x: 34, y: 51, affected: 13, urgency: 2, medical: 1, vulnerable: false, waitHours: 1, supplies: { water: 0, food: 0, medical: 0, blankets: 0, supplies: 0 }, reportedAt: ago(27), teamId: 'TEAM-04', status: 'Resolved', medicalRequirements: 'None reported', override: null, scenarioId: null },
    ],
    camps: [
      { id: 'CAMP-01', name: 'Northbank Community Hall', location: 'Northbank, Sector 4', x: 63, y: 50, occupancy: 186, capacity: 240, staff: 18, status: 'Operational', stock: { water: 92, food: 138, medical: 16, blankets: 83, supplies: 42 }, thresholds: { water: 120, food: 100, medical: 25, blankets: 70, supplies: 45 }, requirements: 'Water, medical kits' },
      { id: 'CAMP-02', name: 'West Ridge Sports Complex', location: 'West Ridge, Sector 2', x: 30, y: 71, occupancy: 112, capacity: 180, staff: 12, status: 'Operational', stock: { water: 178, food: 73, medical: 31, blankets: 55, supplies: 66 }, thresholds: { water: 100, food: 90, medical: 20, blankets: 60, supplies: 35 }, requirements: 'Food packs, blankets' },
      { id: 'CAMP-03', name: 'Old Town Transit Shelter', location: 'Old Town, Sector 1', x: 37, y: 57, occupancy: 74, capacity: 100, staff: 9, status: 'Operational', stock: { water: 105, food: 117, medical: 22, blankets: 42, supplies: 52 }, thresholds: { water: 80, food: 80, medical: 20, blankets: 45, supplies: 30 }, requirements: 'Blankets, medical kits' },
    ],
    teams: [
      { id: 'TEAM-01', name: 'Delta Rescue', lead: 'A. Morgan', capability: ['Swift water', 'Evacuation', 'First aid'], status: 'Assigned', incidentId: 'INC-2394', progress: 62, notes: 'Evacuation underway; school roof access confirmed.', x: 49, y: 37 },
      { id: 'TEAM-02', name: 'Field Medical 2', lead: 'R. Singh', capability: ['Medical', 'Triage', 'Evacuation'], status: 'Assigned', incidentId: 'INC-2401', progress: 34, notes: 'Approaching from the north access point.', x: 73, y: 23 },
      { id: 'TEAM-03', name: 'High Ground Unit', lead: 'M. Chen', capability: ['Search', 'Rope access', 'Evacuation'], status: 'Available', incidentId: null, progress: 0, notes: '', x: 19, y: 43 },
      { id: 'TEAM-04', name: 'Community Support', lead: 'J. Alvarez', capability: ['Welfare checks', 'Distribution'], status: 'Available', incidentId: null, progress: 0, notes: 'Completed civic center welfare check.', x: 42, y: 61 },
    ],
    inventory: { water: { available: 980, reserved: 60, distributed: 420 }, food: { available: 720, reserved: 85, distributed: 350 }, medical: { available: 164, reserved: 22, distributed: 84 }, blankets: { available: 510, reserved: 40, distributed: 215 }, supplies: { available: 304, reserved: 18, distributed: 122 } },
    allocations: [], alerts: [], activity: [], simulations: {}, historical: { incoming: [5, 8, 6, 9, 7, 11, 8], resolved: [3, 5, 4, 6, 5, 7, 6] },
    lastUpdated: new Date().toISOString(),
  });

  let state;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    state = saved && Array.isArray(saved.incidents) && Array.isArray(saved.camps) ? saved : freshData();
  } catch { state = freshData(); }
  let currentPage = location.hash.slice(1) || 'dashboard';
  let activeMapLayers = new Set(['incidents', 'camps', 'teams']);
  let toastTimer;
  let idSequence = 0;
  let earthquakeEvents = [];
  let earthquakeMap = null;
  let earthquakeLayer = null;
  let earthquakeFetchState = { status: 'loading', updatedAt: null, message: 'Connecting to USGS…' };

  const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const can = (permission) => (ROLE_PERMISSIONS[state.role] || []).includes(permission);
  const save = () => { state.lastUpdated = new Date().toISOString(); localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); };
  const resource = (id) => RESOURCES.find((item) => item.id === id);
  const fmtTime = (iso) => new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
  const timeAgo = (iso) => { const mins = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000)); return mins < 60 ? `${mins}m ago` : `${Math.floor(mins / 60)}h ago`; };
  const incidentById = (id) => state.incidents.find((item) => item.id === id);
  const campById = (id) => state.camps.find((item) => item.id === id);
  const teamById = (id) => state.teams.find((item) => item.id === id);
  const generateId = (prefix) => `${prefix}-${String(Date.now()).slice(-6)}-${(++idSequence).toString(36).padStart(2, '0')}`;
  function illustrativePosition(location) {
    const seed = [...location].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return { x: 18 + seed % 63, y: 22 + (seed * 7) % 56 };
  }

  function scoreIncident(incident) {
    const factors = [
      { name: 'Immediate threat', value: incident.urgency / 5, weight: 25 },
      { name: 'Medical urgency', value: incident.medical / 5, weight: 20 },
      { name: 'People affected', value: Math.min(incident.affected / 60, 1), weight: 15 },
      { name: 'Vulnerability', value: incident.vulnerable ? 1 : 0.15, weight: 15 },
      { name: 'Waiting time', value: Math.min(incident.waitHours / 12, 1), weight: 10 },
      { name: 'Essential needs', value: Math.min(Object.values(incident.supplies || {}).reduce((sum, qty) => sum + Number(qty || 0), 0) / 250, 1), weight: 15 },
    ];
    const score = Math.round(factors.reduce((sum, factor) => sum + factor.value * factor.weight, 0));
    let category = score >= 76 ? 'Critical' : score >= 56 ? 'High' : score >= 36 ? 'Moderate' : 'Routine';
    if (incident.override) category = incident.override.category;
    return { score: incident.override?.score ?? score, category, factors, action: score >= 76 ? 'Immediate dispatch; confirm life safety and medical access.' : score >= 56 ? 'Assign a capable team and verify requested supplies.' : score >= 36 ? 'Include in the next coordinated response pass.' : 'Monitor and follow up at the next status check.' };
  }
  function priorityClass(category) { return `priority-${category.toLowerCase()}`; }
  function priorityMarkup(incident) { const result = scoreIncident(incident); return `<span class="priority ${priorityClass(result.category)}"><i></i>${esc(result.category.toUpperCase())} · ${result.score}</span>`; }
  function statusMarkup(status) { return `<span class="status ${esc(status.toLowerCase().replaceAll(' ', '-'))}">${esc(status.toUpperCase())}</span>`; }
  function openAlert(severity, title, message, relatedType, relatedId) {
    const duplicate = state.alerts.some((alert) => alert.title === title && alert.relatedId === relatedId && !alert.read);
    if (!duplicate) state.alerts.unshift({ id: generateId('ALT'), severity, title, message, relatedType, relatedId, at: new Date().toISOString(), read: false });
  }
  function logActivity(text, type = 'update') { state.activity.unshift({ id: generateId('ACT'), text, type, at: new Date().toISOString() }); state.activity = state.activity.slice(0, 40); }
  function refreshShortageAlerts() {
    state.camps.forEach((camp) => Object.entries(camp.stock).forEach(([key, qty]) => {
      if (qty < (camp.thresholds[key] ?? 0)) openAlert('warning', `${resource(key).label} shortage`, `${camp.name} has ${qty} ${resource(key).unit}; minimum is ${camp.thresholds[key]}.`, 'camp', camp.id);
    }));
  }
  function initialize() {
    if (!state.activity.length) logActivity('Command center initialized with demonstration data.', 'system');
    if (!state.alerts.length) {
      state.incidents.filter((item) => item.status !== 'Resolved' && scoreIncident(item).category === 'Critical').forEach((item) => openAlert('critical', 'Critical incident requires action', `${item.title} · ${item.location}`, 'incident', item.id));
      refreshShortageAlerts();
    }
    save();
  }

  function pageHeading(title, subtitle, actions = '') {
    return `<div class="page-heading"><div><div class="kicker">DISPLACEOS / ${esc(currentPage.toUpperCase())}</div><h1>${title}</h1><p>${subtitle}</p></div><div class="heading-actions">${actions}</div></div>`;
  }
  function notice() { return `<div class="simulation-notice"><span class="notice-symbol">△</span><span><b>SIMULATION MODE</b> — DEMONSTRATION DATA ONLY. NOT CONNECTED TO LIVE EMERGENCY SERVICES.</span></div>`; }
  function metric(label, value, detail, icon, tone = '') { return `<article class="metric"><div class="metric-head"><span>${label}</span><span class="metric-icon ${tone}">${icon}</span></div><div class="metric-number ${tone}">${value}</div><div class="metric-foot">${detail}</div></article>`; }
  function incidentRow(item, showTeam = true) {
    const team = item.teamId ? teamById(item.teamId)?.name || 'Team assigned' : 'Unassigned';
    return `<tr class="click-row" data-action="open-incident" data-id="${esc(item.id)}"><td><span class="incident-title">${esc(item.title)}</span><div class="incident-sub">${esc(item.id)} · ${esc(item.location)}</div></td><td>${priorityMarkup(item)}</td><td>${statusMarkup(item.status)}</td>${showTeam ? `<td class="hide-mobile">${esc(team)}</td>` : ''}<td class="hide-mobile">${timeAgo(item.reportedAt)}</td></tr>`;
  }
  function table(items, showTeam = true) {
    if (!items.length) return `<div class="empty-state"><strong>No matching incidents</strong><p>Try adjusting filters or report a new incident.</p></div>`;
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>INCIDENT / LOCATION</th><th>PRIORITY</th><th>STATUS</th>${showTeam ? '<th class="hide-mobile">ASSIGNED TEAM</th>' : ''}<th class="hide-mobile">REPORTED</th></tr></thead><tbody>${items.map((item) => incidentRow(item, showTeam)).join('')}</tbody></table></div>`;
  }
  function activityMarkup(items = state.activity.slice(0, 5)) {
    if (!items.length) return `<div class="empty-state"><strong>No activity yet</strong><p>Changes and assignments will appear here.</p></div>`;
    const glyphs = { incident: '⌖', allocation: '▤', team: '◈', simulation: '△', system: '·', update: '↻', resolved: '✓' };
    return `<div class="activity-list">${items.map((item) => `<div class="activity-item"><span class="activity-glyph">${glyphs[item.type] || '·'}</span><div class="activity-text">${esc(item.text)}</div><span class="activity-time">${timeAgo(item.at)}</span></div>`).join('')}</div>`;
  }
  function alertMarkup(alert, full = false) {
    const label = alert.severity === 'critical' ? 'CRITICAL' : alert.severity === 'warning' ? 'SHORTAGE' : 'UPDATE';
    return `<div class="alert-row ${alert.read ? '' : 'unread'}"><i class="alert-stripe ${esc(alert.severity)}"></i><div class="alert-message"><strong>${esc(alert.title)} <span class="kicker">· ${label}</span></strong>${esc(alert.message)}<div class="alert-meta">${fmtTime(alert.at)} · ${timeAgo(alert.at)} ${alert.read ? '· READ' : '· UNREAD'}</div></div>${full ? `<button class="button small" data-action="open-related" data-type="${esc(alert.relatedType)}" data-id="${esc(alert.relatedId)}">Open</button>` : ''}</div>`;
  }
  function miniMap() { return `<div class="map-mini">${mapSvg(false)}</div><div class="legend"><span><i style="background:var(--red)"></i>Incident</span><span><i style="background:var(--cyan)"></i>Relief camp</span><span><i style="background:var(--green)"></i>Response team</span></div>`; }
  function mapSvg(large = false) {
    const points = [];
    if (activeMapLayers.has('incidents')) state.incidents.filter((item) => item.status !== 'Resolved').forEach((item) => points.push({ x: item.x, y: item.y, color: item.category === 'Flood' ? '#ff6a70' : '#ffb45b', label: item.id, type: 'incident', id: item.id }));
    if (activeMapLayers.has('camps')) state.camps.forEach((item) => points.push({ x: item.x, y: item.y, color: '#52d5dd', label: item.id, type: 'camp', id: item.id }));
    if (activeMapLayers.has('teams')) state.teams.forEach((item) => points.push({ x: item.x, y: item.y, color: item.status === 'Available' ? '#74dba4' : '#79bfff', label: item.id, type: 'team', id: item.id }));
    return `<svg class="map-svg" viewBox="0 0 800 430" role="img" aria-label="Demonstration map of Northbank, West Ridge, and Old Town"><path class="map-base" d="M0 0h800v430H0z"/><path class="map-water" d="M0 271 67 248l45 11 37-40 59 13 39-38 52 14 22 41-18 34 10 42-31 28H0z"/><path class="map-river" d="M503-20c-24 60 19 89-6 139s-7 93-39 128 4 74-31 109 1 61-13 96"/><path class="map-road" d="M30 360 222 274 365 294 508 209 745 188M87 74l139 90 134-25 140 70 180-14M164 417 267 319 303 211 431 111 566 52M2 184l184 13 145 89 107-31 168 64 194-12"/><path class="map-road" d="m0 115 190 39 124-80 116 53 149-26 211 31M90 430l103-81 126 15 108-71 188 44 185-45"/><text class="map-label" x="61" y="96">WEST RIDGE</text><text class="map-label" x="555" y="94">NORTHBANK</text><text class="map-label" x="335" y="370">OLD TOWN</text><text class="map-label dim" x="345" y="205">RIVER KEL</text><text class="map-label dim" x="32" y="403">NORTH DISTRICT · DEMO GRID</text>${points.map((item) => `<g class="map-point" data-action="open-related" data-type="${item.type}" data-id="${esc(item.id)}" transform="translate(${item.x * 8},${item.y * 4.3})"><circle r="${large ? 7 : 6}" fill="${item.color}"/><circle r="${large ? 12 : 10}" fill="${item.color}" opacity=".15"/><text x="10" y="3">${esc(item.label)}</text></g>`).join('')}</svg>`;
  }
  function dashboardView() {
    const active = state.incidents.filter((item) => item.status !== 'Resolved');
    const critical = active.filter((item) => scoreIncident(item).category === 'Critical').length;
    const teamsActive = state.teams.filter((item) => item.status === 'Assigned').length;
    const campsOpen = state.camps.filter((item) => item.status === 'Operational').length;
    const unresolvedAlerts = state.alerts.filter((item) => !item.read).length;
    const incidents = [...active].sort((a, b) => scoreIncident(b).score - scoreIncident(a).score).slice(0, 5);
    return `${pageHeading('Command center', 'One Crisis. One Command Center. Every Life Matters. · North District response overview', `<button class="button" data-page="simulation">△ &nbsp;Simulation lab</button><button class="button primary" data-action="new-incident">＋ &nbsp;Report incident</button>`)}${notice()}<div class="metric-grid">${metric('ACTIVE INCIDENTS', active.length, 'Across 3 demonstration areas', '⌖')}${metric('CRITICAL PENDING', critical, `${active.length ? Math.round(critical / active.length * 100) : 0}% of unresolved`, '!', critical ? 'text-red' : '')}${metric('TEAMS DEPLOYED', teamsActive, `${state.teams.length - teamsActive} currently available`, '◈', 'text-cyan')}${metric('OPERATIONAL CAMPS', campsOpen, `${state.camps.length} monitored locations`, '⌂', 'text-green')}${metric('UNREAD ALERTS', unresolvedAlerts, `${state.alerts.length} total notifications`, '♧', unresolvedAlerts ? 'text-orange' : '')}</div><div class="dashboard-grid"><div><section class="panel"><header class="panel-head"><div><h2>Priority queue</h2><p>Ranked by explainable demonstration score</p></div><button class="link-button" data-page="incidents">VIEW ALL →</button></header>${table(incidents)}</section><section class="panel" style="margin-top:12px"><header class="panel-head"><div><h2>Situation map</h2><p>Simulated locations · North District</p></div><button class="link-button" data-page="map">EXPAND MAP →</button></header>${miniMap()}</section></div><div><section class="panel"><header class="panel-head"><div><h2>Critical alerts</h2><p>${unresolvedAlerts} unread notifications</p></div><button class="link-button" data-page="alerts">OPEN ALERTS →</button></header><div class="panel-content">${state.alerts.slice(0, 4).map((item) => alertMarkup(item)).join('') || '<div class="empty-state">All clear for now.</div>'}</div></section><section class="panel" style="margin-top:12px"><header class="panel-head"><div><h2>Latest activity</h2><p>Operational changes across the response</p></div><span class="kicker">LOCAL DEMO</span></header><div class="panel-content">${activityMarkup()}</div></section></div></div>`;
  }
  function incidentsView() {
    const items = [...state.incidents].sort((a, b) => scoreIncident(b).score - scoreIncident(a).score);
    return `${pageHeading('Incident management', 'Triage, coordinate, and track requests for assistance.', `<button class="button primary" data-action="new-incident">＋ &nbsp;Report incident</button>`)}<section class="panel incident-list-panel"><header class="panel-head"><div><h2>All incidents <span class="kicker">${items.length} RECORDS</span></h2><p>Priority scores update when incident details change.</p></div><div class="searchbar"><input id="incidentSearch" placeholder="Search incidents..." aria-label="Search incidents"><select id="incidentStatus"><option value="all">All statuses</option><option>Open</option><option>Assigned</option><option>Resolved</option></select><select id="incidentCategory"><option value="all">All hazards</option><option>Flood</option><option>Earthquake</option><option>Landslide</option></select></div></header><div id="incidentTable">${table(items)}</div><div class="panel-content"><span class="kicker">SCORING: IMMEDIATE THREAT 25% · MEDICAL 20% · AFFECTED 15% · VULNERABILITY 15% · WAIT 10% · SUPPLIES 15%</span></div></section>`;
  }
  function campCard(camp) {
    const percent = Math.round(camp.occupancy / camp.capacity * 100);
    return `<article class="camp-card"><div class="camp-card-head"><div><h3>${esc(camp.name)}</h3><div class="card-meta">${esc(camp.id)} · ${esc(camp.location)}</div></div>${statusMarkup(camp.status)}</div><div class="occupancy"><div class="occupancy-head"><span>OCCUPANCY</span><strong>${camp.occupancy} / ${camp.capacity} · ${percent}%</strong></div><div class="occupancy-track"><i style="width:${Math.min(percent, 100)}%;background:${percent >= 90 ? 'var(--red)' : percent >= 75 ? 'var(--orange)' : 'var(--cyan)'}"></i></div></div>${RESOURCES.map((item) => `<div class="stock-row"><span>${item.label.replace('Drinking ', '')}</span><span class="shortage-bar"><i style="width:${Math.min(100, Math.round(camp.stock[item.id] / Math.max(camp.thresholds[item.id], 1) * 100))}%;background:${camp.stock[item.id] < camp.thresholds[item.id] ? 'var(--red)' : 'var(--green)'}"></i></span><strong class="${camp.stock[item.id] < camp.thresholds[item.id] ? 'text-red' : ''}">${camp.stock[item.id]} ${item.unit}</strong></div>`).join('')}<div class="camp-card-footer"><span class="card-meta">${camp.staff} STAFF · NEEDS: ${esc(camp.requirements)}</span><button class="button small" data-action="camp-detail" data-id="${esc(camp.id)}">Manage</button></div></article>`;
  }
  function campsView() {
    const shortages = state.camps.reduce((total, camp) => total + Object.keys(camp.stock).filter((key) => camp.stock[key] < camp.thresholds[key]).length, 0);
    return `${pageHeading('Relief camps', 'Capacity, supply readiness, and reported needs.', `<span class="kicker text-orange">${shortages} STOCK SHORTAGES</span>`)}<div class="metric-grid">${metric('OPERATIONAL SITES', state.camps.filter((camp) => camp.status === 'Operational').length, 'Demonstration locations', '⌂', 'text-green')}${metric('PEOPLE SHELTERED', state.camps.reduce((sum, camp) => sum + camp.occupancy, 0), 'Across tracked camps', '◉')}${metric('TOTAL CAPACITY', state.camps.reduce((sum, camp) => sum + camp.capacity, 0), 'Available beds vary by site', '▤')}${metric('SHORTAGE ITEMS', shortages, 'Below configured minimums', '!', shortages ? 'text-orange' : '')}</div><div class="camp-grid">${state.camps.map(campCard).join('')}</div>`;
  }
  function teamsView() {
    return `${pageHeading('Response teams', 'Availability, capability, and task progress.', `<span class="kicker">${state.teams.filter((team) => team.status === 'Available').length} AVAILABLE / ${state.teams.length} TOTAL</span>`)}<div class="team-grid">${state.teams.map((team) => { const incident = team.incidentId ? incidentById(team.incidentId) : null; return `<article class="team-card"><div class="team-card-head"><div><h3>${esc(team.name)}</h3><div class="card-meta">${esc(team.id)} · LEAD ${esc(team.lead)}</div></div>${statusMarkup(team.status)}</div><div class="team-capabilities">${team.capability.map((cap) => `<span class="capability">${esc(cap.toUpperCase())}</span>`).join('')}</div><div class="team-assignment">${incident ? `<strong>${esc(incident.id)} · ${esc(incident.title)}</strong>` : 'No current assignment'}<br>${esc(team.notes || '')}</div>${team.status === 'Assigned' ? `<div class="progress-row"><span class="kicker">PROGRESS</span><span class="factor-track"><i style="width:${team.progress}%;background:var(--cyan)"></i></span><span class="kicker">${team.progress}%</span></div>` : ''}<div class="team-card-footer"><span class="card-meta">SIMULATED POSITION · ${team.x}, ${team.y}</span><button class="button small" data-action="team-detail" data-id="${esc(team.id)}">${team.status === 'Available' ? 'Assign task' : 'Update task'}</button></div></article>`; }).join('')}</div>`;
  }
  function resourcesView() {
    const recommendations = state.incidents.filter((item) => item.status !== 'Resolved').flatMap((incident) => Object.entries(incident.supplies || {}).filter(([, qty]) => qty > 0).map(([key, qty]) => ({ incident, key, qty, score: scoreIncident(incident).score }))).sort((a, b) => b.score - a.score).slice(0, 5);
    return `${pageHeading('Resource coordination', 'Review demand, verify availability, and confirm distributions.', `<button class="button primary" data-action="new-allocation">＋ &nbsp;Record allocation</button>`)}<div class="resource-grid">${RESOURCES.map((item) => { const stock = state.inventory[item.id]; return `<article class="resource-card"><div class="camp-card-head"><h3>${item.label}</h3><span class="kicker">${item.unit.toUpperCase()}</span></div><div class="resource-number ${stock.available < item.threshold ? 'text-orange' : ''}">${stock.available.toLocaleString()}</div><div class="resource-units">AVAILABLE TO ALLOCATE</div><div class="resource-breakdown"><span>Reserved <strong>${stock.reserved}</strong></span><span>Distributed <strong>${stock.distributed}</strong></span></div></article>`; }).join('')}</div><section class="panel" style="margin-top:13px"><header class="panel-head"><div><h2>Recommended allocations</h2><p>Priority-ranked against verified demo requests and available central stock.</p></div><span class="kicker">HUMAN REVIEW REQUIRED</span></header><div class="panel-content">${recommendations.map((item) => { const dest = state.camps.slice().sort((a, b) => (a.stock[item.key] / a.thresholds[item.key]) - (b.stock[item.key] / b.thresholds[item.key]))[0]; const amount = Math.min(item.qty, state.inventory[item.key].available); return `<article class="recommendation"><div class="recommendation-head"><h3>${esc(resource(item.key).label)} · ${amount} ${esc(resource(item.key).unit)} → ${esc(dest.name)}</h3>${priorityMarkup(item.incident)}</div><p>${esc(item.incident.id)} requests ${item.qty} ${esc(resource(item.key).unit)}. ${dest.name} has ${dest.stock[item.key]} in stock against a minimum of ${dest.thresholds[item.key]}. Central stock can cover the recommended quantity.</p><div class="recommendation-foot"><span>WHY: ${item.score} priority · camp below/near threshold</span><button class="button small" data-action="recommend-allocation" data-incident="${esc(item.incident.id)}" data-resource="${esc(item.key)}" data-camp="${esc(dest.id)}" data-quantity="${amount}" ${amount <= 0 || !can('allocation.confirm') ? 'disabled' : ''}>Review & confirm</button></div></article>`; }).join('') || '<div class="empty-state">No current resource recommendations.</div>'}</div></section><section class="panel" style="margin-top:13px"><header class="panel-head"><div><h2>Allocation history</h2><p>Confirmed distributions recorded in this browser.</p></div></header>${state.allocations.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>DESTINATION / INCIDENT</th><th>RESOURCE</th><th>QUANTITY</th><th>TIME</th></tr></thead><tbody>${state.allocations.slice().reverse().map((item) => `<tr><td>${esc(campById(item.campId)?.name || item.destination)}<div class="incident-sub">${esc(item.incidentId || '')}</div></td><td>${esc(resource(item.resourceId).label)}</td><td>${item.quantity} ${esc(resource(item.resourceId).unit)}</td><td>${timeAgo(item.at)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="panel-content"><span class="kicker">No confirmed allocations yet.</span></div>'}</section>`;
  }
  function mapView() {
    const itemCount = state.incidents.filter((item) => item.status !== 'Resolved').length + state.camps.length + state.teams.length;
    return `${pageHeading('Situation map', 'Regional response records and separate live global seismic telemetry.', `<label class="searchbar"><input id="mapSearch" placeholder="Find incident, camp, team..." aria-label="Search map records"></label>`)}<section class="panel seismic-panel"><header class="panel-head"><div><h2>USGS live earthquakes</h2><p>All earthquakes reported in the past hour · global coordinates from USGS GeoJSON</p></div><div class="map-controls"><span class="kicker" id="earthquakeStatus">${esc(earthquakeFetchState.message)}</span><button class="button small" data-action="refresh-earthquakes">↻ Sync API now</button></div></header><div class="seismic-map-wrap"><div id="earthquakeMap" class="seismic-map" role="application" aria-label="Global map of recent USGS earthquakes"></div><div id="earthquakeMapFallback" class="map-fallback" ${earthquakeMap ? 'hidden' : ''}>${typeof L === 'undefined' ? 'Map tiles are unavailable. Use the earthquake event list below.' : 'Loading map tiles…'}</div></div><div class="legend"><span><i style="background:#ff626b"></i>USGS earthquake · marker size reflects magnitude</span><span id="earthquakeUpdated">${earthquakeEvents.length} events · ${earthquakeFetchState.updatedAt ? `updated ${timeAgo(earthquakeFetchState.updatedAt)}` : 'waiting for feed'}</span></div><div id="earthquakeList" class="quake-list">${earthquakeList()}</div></section><div class="map-layout" style="margin-top:13px"><section class="panel"><header class="panel-head"><div><h2>North District · demonstration map</h2><p>${itemCount} incident, camp, and team records · positions are illustrative, not GPS</p></div><div class="map-controls">${[['incidents','Incidents'],['camps','Camps'],['teams','Teams']].map(([id,label]) => `<button class="map-filter ${activeMapLayers.has(id) ? 'on' : ''}" data-action="map-layer" data-layer="${id}">${label}</button>`).join('')}</div></header><div class="map-large">${mapSvg(true)}</div><div class="legend"><span><i style="background:var(--red)"></i>Flood incident</span><span><i style="background:var(--orange)"></i>Other incident</span><span><i style="background:var(--cyan)"></i>Relief camp</span><span><i style="background:var(--green)"></i>Available team</span><span><i style="background:var(--blue)"></i>Assigned team</span></div></section><section class="panel"><header class="panel-head"><div><h2>Mapped records</h2><p>Select a marker or record to inspect details.</p></div></header><div class="map-side-list" id="mapRecordList">${mapRecords()}</div></section></div>`;
  }
  function earthquakeList() {
    if (earthquakeFetchState.status === 'error') return `<div class="empty-state"><strong>USGS feed unavailable</strong><p>${esc(earthquakeFetchState.message)} The schematic regional incident map remains available below.</p></div>`;
    if (!earthquakeEvents.length) return `<div class="empty-state"><strong>${earthquakeFetchState.status === 'loading' ? 'Loading earthquake events…' : 'No events returned'}</strong><p>Feed: USGS all-hour GeoJSON.</p></div>`;
    return `<div class="quake-list-head"><span>MAGNITUDE</span><span>PLACE</span><span>UTC TIME</span></div>${earthquakeEvents.slice(0, 20).map((quake) => `<button class="quake-row" data-action="focus-earthquake" data-id="${esc(quake.id)}"><strong class="quake-mag">M ${quake.magnitude == null ? '—' : quake.magnitude.toFixed(1)}</strong><span>${esc(quake.place)}</span><time>${new Date(quake.timestamp).toLocaleString()}</time></button>`).join('')}`;
  }
  async function loadDisasterAPIs() {
    earthquakeFetchState = { ...earthquakeFetchState, status: 'loading', message: 'Syncing USGS…' };
    updateEarthquakeStatus();
    try {
      const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson', { headers: { Accept: 'application/geo+json' }, cache: 'no-store' });
      if (!response.ok) throw new Error(`USGS request failed (${response.status})`);
      const data = await response.json();
      if (!Array.isArray(data.features)) throw new Error('USGS returned an unexpected GeoJSON response.');
      earthquakeEvents = data.features.flatMap((quake) => {
        const coordinates = quake.geometry?.coordinates;
        const magnitude = quake.properties?.mag;
        const timestamp = quake.properties?.time;
        if (!Array.isArray(coordinates) || !Number.isFinite(coordinates[0]) || !Number.isFinite(coordinates[1]) || !Number.isFinite(timestamp)) return [];
        return [{ id: String(quake.id), magnitude: Number.isFinite(magnitude) ? magnitude : null, place: quake.properties?.place || 'Unknown location', longitude: coordinates[0], latitude: coordinates[1], depthKm: Number.isFinite(coordinates[2]) ? coordinates[2] : null, timestamp: new Date(timestamp).toISOString(), url: quake.properties?.url || '' }];
      });
      earthquakeFetchState = { status: 'success', updatedAt: new Date().toISOString(), message: `USGS live · ${earthquakeEvents.length} events` };
      console.info(`[USGS] Loaded ${earthquakeEvents.length} earthquake events from the past hour.`);
    } catch (error) {
      earthquakeFetchState = { status: 'error', updatedAt: earthquakeFetchState.updatedAt, message: error instanceof Error ? error.message : 'Unknown USGS feed error.' };
      console.error('Error fetching live disaster data:', error);
    }
    if (currentPage === 'map') {
      render();
    } else if (earthquakeMap) {
      updateEarthquakeMap();
    }
  }
  function updateEarthquakeStatus() {
    const status = document.getElementById('earthquakeStatus');
    if (status) status.textContent = earthquakeFetchState.message;
  }
  function initializeEarthquakeMap() {
    const container = document.getElementById('earthquakeMap');
    if (!container) return;
    const fallback = document.getElementById('earthquakeMapFallback');
    if (typeof L === 'undefined') {
      if (fallback) fallback.textContent = 'Leaflet could not load. USGS events remain available in the list below.';
      return;
    }
    try {
      earthquakeMap = L.map(container, { scrollWheelZoom: false, worldCopyJump: true }).setView([20, 0], 2);
      earthquakeLayer = L.layerGroup().addTo(earthquakeMap);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 10, attribution: '&copy; OpenStreetMap contributors' }).addTo(earthquakeMap);
      if (fallback) fallback.hidden = true;
      updateEarthquakeMap();
      setTimeout(() => earthquakeMap?.invalidateSize(), 50);
    } catch (error) {
      console.error('Could not initialize the USGS Leaflet map:', error);
      if (fallback) { fallback.hidden = false; fallback.textContent = 'Interactive map is unavailable. The USGS event list remains available below.'; }
    }
  }
  function updateEarthquakeMap() {
    if (!earthquakeLayer) return;
    earthquakeLayer.clearLayers();
    earthquakeEvents.forEach((quake) => {
      const magnitude = quake.magnitude ?? 0.5;
      const marker = L.circleMarker([quake.latitude, quake.longitude], { radius: Math.max(4, Math.min(18, magnitude * 3)), color: '#ff626b', fillColor: '#ff3344', fillOpacity: 0.55, weight: 1.5 });
      const popup = `<strong>USGS earthquake</strong><br>Location: ${esc(quake.place)}<br>Magnitude: ${quake.magnitude == null ? 'Not reported' : quake.magnitude.toFixed(1)}<br>Depth: ${quake.depthKm == null ? 'Not reported' : `${quake.depthKm.toFixed(1)} km`}<br>Time: ${new Date(quake.timestamp).toLocaleString()}`;
      marker.bindPopup(popup).addTo(earthquakeLayer);
    });
    const status = document.getElementById('earthquakeStatus');
    if (status) status.textContent = earthquakeFetchState.message;
    const updated = document.getElementById('earthquakeUpdated');
    if (updated) updated.textContent = `${earthquakeEvents.length} events · ${earthquakeFetchState.updatedAt ? `updated ${timeAgo(earthquakeFetchState.updatedAt)}` : 'not synced'}`;
    const list = document.getElementById('earthquakeList');
    if (list) list.innerHTML = earthquakeList();
  }
  function mapRecords(query = '') {
    const q = query.toLowerCase();
    const records = [...state.incidents.filter((item) => item.status !== 'Resolved').map((item) => ({ type: 'incident', id: item.id, title: item.title, location: item.location, score: scoreIncident(item).score })), ...state.camps.map((item) => ({ type: 'camp', id: item.id, title: item.name, location: item.location })), ...state.teams.map((item) => ({ type: 'team', id: item.id, title: item.name, location: `Team ${item.status.toLowerCase()}` }))].filter((item) => `${item.id} ${item.title} ${item.location}`.toLowerCase().includes(q));
    return records.map((item) => `<div class="map-list-item" data-action="open-related" data-type="${item.type}" data-id="${esc(item.id)}"><strong>${esc(item.title)}</strong>${item.score ? `<span class="kicker"> · ${item.score}</span>` : ''}<small>${esc(item.id)} · ${esc(item.location)}</small></div>`).join('') || '<div class="empty-state">No matching mapped records.</div>';
  }
  function chartBars(valuesA, valuesB, labels, names = ['Incoming', 'Resolved']) {
    const max = Math.max(...valuesA, ...valuesB, 1);
    return `<div class="chart">${labels.map((label, index) => `<div class="chart-group"><i class="chart-bar" style="height:${Math.max(valuesA[index] / max * 86, 2)}%" title="${names[0]}: ${valuesA[index]}"></i><i class="chart-bar alt" style="height:${Math.max(valuesB[index] / max * 86, 2)}%" title="${names[1]}: ${valuesB[index]}"></i><span class="chart-label">${label}</span></div>`).join('')}</div><div class="chart-key"><span><i></i>${names[0]}</span><span><i class="red-key"></i>${names[1]}</span></div>`;
  }
  function analyticsView() {
    const active = state.incidents.filter((item) => item.status !== 'Resolved');
    const categories = ['Critical', 'High', 'Moderate', 'Routine'];
    const categoryCounts = categories.map((category) => active.filter((item) => scoreIncident(item).category === category).length);
    const maxCategory = Math.max(...categoryCounts, 1);
    const resourceUsage = RESOURCES.map((item) => state.inventory[item.id].distributed);
    const maxResource = Math.max(...resourceUsage, 1);
    const workload = state.teams.map((team) => team.incidentId ? 1 : 0);
    const days = ['M','T','W','T','F','S','S'];
    return `${pageHeading('Response analytics', 'Operational indicators calculated from this browser’s records.', `<span class="kicker">SEEDED HISTORICAL SERIES · DEMONSTRATION ONLY</span>`)}<div class="analytics-grid"><section class="panel"><header class="panel-head"><div><h2>Incoming vs resolved</h2><p>Seeded 7-day example · current records are separate</p></div></header><div class="panel-content">${chartBars(state.historical.incoming, state.historical.resolved, days)}</div></section><section class="panel"><header class="panel-head"><div><h2>Priority distribution</h2><p>${active.length} active incident records</p></div></header><div class="panel-content">${categories.map((category,index) => `<div class="stock-row"><span class="${priorityClass(category)}">${category}</span><span class="shortage-bar"><i style="width:${categoryCounts[index] / maxCategory * 100}%;background:${['var(--red)','var(--orange)','#e9d36f','var(--green)'][index]}"></i></span><strong>${categoryCounts[index]}</strong></div>`).join('')}</div></section><section class="panel"><header class="panel-head"><div><h2>Resource distribution</h2><p>Cumulative units distributed from central inventory</p></div></header><div class="panel-content">${RESOURCES.map((item,index) => `<div class="stock-row"><span>${item.label}</span><span class="shortage-bar"><i style="width:${resourceUsage[index] / maxResource * 100}%;background:var(--cyan)"></i></span><strong>${resourceUsage[index]}</strong></div>`).join('')}</div></section><section class="panel"><header class="panel-head"><div><h2>Team workload</h2><p>Current assignments · no live tracking</p></div></header><div class="panel-content">${state.teams.map((team,index) => `<div class="stock-row"><span>${esc(team.name)}</span><span class="shortage-bar"><i style="width:${workload[index] * 100}%;background:${workload[index] ? 'var(--blue)' : 'var(--green)'}"></i></span><strong>${workload[index] ? '1 task' : 'Free'}</strong></div>`).join('')}</div></section><section class="panel"><header class="panel-head"><div><h2>Camp shortage count</h2><p>Stock below configured camp thresholds</p></div></header><div class="panel-content">${state.camps.map((camp) => { const count = Object.keys(camp.stock).filter((key) => camp.stock[key] < camp.thresholds[key]).length; return `<div class="stock-row"><span>${esc(camp.name)}</span><span class="shortage-bar"><i style="width:${count / RESOURCES.length * 100}%;background:${count ? 'var(--orange)' : 'var(--green)'}"></i></span><strong>${count}</strong></div>`; }).join('')}</div></section><section class="panel"><header class="panel-head"><div><h2>Response-time trend</h2><p>Current unresolved reports · elapsed hours (not service-level performance)</p></div></header><div class="panel-content">${active.length ? active.slice().sort((a,b)=>b.waitHours-a.waitHours).slice(0,5).map((item)=>`<div class="stock-row"><span>${esc(item.id)}</span><span class="shortage-bar"><i style="width:${Math.min(item.waitHours/12*100,100)}%;background:${item.waitHours>8?'var(--red)':'var(--orange)'}"></i></span><strong>${item.waitHours.toFixed(1)}h</strong></div>`).join('') : '<span class="kicker">No unresolved reports.</span>'}</div></section></div>`;
  }
  function alertsView() {
    return `${pageHeading('Alert center', 'Notifications generated from incidents, shortages, and coordination actions.', `<button class="button" data-action="mark-all-read" ${state.alerts.every((item) => item.read) ? 'disabled' : ''}>Mark all read</button>`)}<section class="panel"><header class="panel-head"><div><h2>Notifications</h2><p>${state.alerts.filter((item) => !item.read).length} unread · newest first</p></div></header><div class="panel-content">${state.alerts.length ? state.alerts.map((item) => alertMarkup(item, true)).join('') : '<div class="empty-state"><strong>No alerts</strong><p>New critical incidents and camp shortages will appear here.</p></div>'}</div></section>`;
  }
  function simulationView() {
    const scenarios = [
      { id: 'flood', name: 'Flood event', icon: '≈', tag: 'RIVER BASIN / RAPID ONSET', desc: 'Levee overflow in Northbank. Creates evacuation and medical requests, strains camp water and blankets, and updates a response assignment.' },
      { id: 'earthquake', name: 'Earthquake event', icon: '⌁', tag: 'URBAN / STRUCTURAL DAMAGE', desc: 'Aftershock reports in Old Town. Adds search and triage requests, reduces medical and shelter stocks, and raises new alerts.' },
      { id: 'landslide', name: 'Landslide event', icon: '▲', tag: 'HILLSIDE / ACCESS DISRUPTION', desc: 'Slope failure near West Ridge. Creates access and welfare checks, surfaces food and supply needs, and updates team coordination.' },
    ];
    return `${pageHeading('Simulation lab', 'Exercise shared coordination logic across incidents, camps, teams, and alerts.', `<button class="button danger" data-action="reset-demo" ${!can('simulation.reset') ? 'disabled' : ''}>↻ &nbsp;Reset demonstration data</button>`)}${notice()}<div class="scenario-grid">${scenarios.map((scenario) => { const active = state.simulations[scenario.id]; return `<article class="scenario-card ${active ? 'active' : ''}"><div class="scenario-top"><span class="scenario-icon">${scenario.icon}</span><span class="scenario-tag">${scenario.tag}</span></div><h3>${scenario.name}</h3><p>${scenario.desc}</p>${active ? `<button class="button small" disabled>RUN COMPLETE · ${fmtTime(active.at)}</button>` : `<button class="button primary" data-action="run-simulation" data-scenario="${scenario.id}" ${!can('simulation.run') ? 'disabled' : ''}>Run ${scenario.name.split(' ')[0]} simulation</button>`}</article>`; }).join('')}</div><section class="panel" style="margin-top:13px"><header class="panel-head"><div><h2>Latest run summary</h2><p>Before-and-after records from the most recent scenario.</p></div><span class="kicker">SHARED DATA MODEL</span></header><div class="panel-content">${latestSimulationSummary()}</div></section><section class="panel" style="margin-top:13px"><header class="panel-head"><div><h2>What the simulation changes</h2><p>Scenarios use the same incident, shortage, team, alert, map, and allocation data as the command center.</p></div></header><div class="panel-content"><div class="scenario-summary"><div class="summary-item"><small>INCIDENTS</small><strong>Created with explainable score</strong></div><div class="summary-item"><small>CAMPS & INVENTORY</small><strong>Stocks and shortage alerts updated</strong></div><div class="summary-item"><small>TEAMS & MAP</small><strong>Assignment view and markers refreshed</strong></div></div></div></section>`;
  }
  function latestSimulationSummary() {
    const recent = state.activity.find((item) => item.type === 'simulation');
    if (!recent) return '<div class="empty-state"><strong>No scenario run yet</strong><p>Choose a hazard above to generate a cross-module before-and-after summary.</p></div>';
    const run = Object.values(state.simulations).slice(-1)[0];
    if (!run?.summary) return `<div class="panel-content">${esc(recent.text)}</div>`;
    return `<div class="scenario-summary">${run.summary.map((item) => `<div class="summary-item"><small>${esc(item.label)}</small><strong>${esc(item.value)}</strong></div>`).join('')}</div><p class="card-meta" style="margin-top:12px">${esc(recent.text)} · ${timeAgo(recent.at)}</p>`;
  }
  const VIEWS = { dashboard: dashboardView, incidents: incidentsView, map: mapView, camps: campsView, teams: teamsView, resources: resourcesView, analytics: analyticsView, alerts: alertsView, simulation: simulationView };
  function render() {
    const view = document.getElementById('view');
    view.innerHTML = (VIEWS[currentPage] || dashboardView)();
    document.getElementById('pageCrumb').textContent = currentPage.replace('-', ' ').toUpperCase();
    document.querySelectorAll('[data-page]').forEach((button) => button.classList.toggle('active', button.dataset.page === currentPage));
    document.getElementById('incidentNavCount').textContent = state.incidents.filter((item) => item.status !== 'Resolved').length;
    const unread = state.alerts.filter((item) => !item.read).length;
    document.getElementById('alertNavCount').textContent = unread;
    document.getElementById('alertNavCount').hidden = unread === 0;
    document.getElementById('topAlertDot').hidden = unread === 0;
    document.getElementById('roleSelect').value = state.role;
  }
  function showToast(message) {
    const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }
  function navigate(page) { if (!VIEWS[page]) return; currentPage = page; history.replaceState(null, '', `#${page}`); render(); }
  function openDialog(title, kicker, content) {
    document.getElementById('dialogTitle').textContent = title; document.getElementById('dialogKicker').textContent = kicker;
    document.getElementById('dialogBody').innerHTML = content; document.getElementById('dialog').hidden = false;
    document.querySelector('#dialog input, #dialog select, #dialog textarea')?.focus();
  }
  function closeDialog() { document.getElementById('dialog').hidden = true; }
  function incidentForm(item = null) {
    if (!can(item ? 'incident.edit' : 'incident.create')) return showToast('This role cannot change incident records.');
    const current = item || { title: '', description: '', category: 'Flood', location: '', affected: 1, urgency: 3, medical: 1, vulnerable: false, medicalRequirements: '', supplies: {} };
    openDialog(item ? 'Edit incident' : 'Report an incident', 'INCIDENT MANAGEMENT', `<form id="incidentForm" data-id="${item ? esc(item.id) : ''}"><div class="form-grid"><div class="field full"><label for="title">INCIDENT TITLE *</label><input id="title" name="title" maxlength="90" required value="${esc(current.title)}" placeholder="Describe the immediate need"></div><div class="field"><label for="category">HAZARD TYPE *</label><select id="category" name="category"><option ${current.category === 'Flood' ? 'selected' : ''}>Flood</option><option ${current.category === 'Earthquake' ? 'selected' : ''}>Earthquake</option><option ${current.category === 'Landslide' ? 'selected' : ''}>Landslide</option></select></div><div class="field"><label for="location">LOCATION *</label><input id="location" name="location" required maxlength="100" value="${esc(current.location)}" placeholder="Area or landmark"></div><div class="field"><label for="affected">PEOPLE AFFECTED *</label><input id="affected" name="affected" type="number" min="1" max="50000" required value="${current.affected}"></div><div class="field"><label for="urgency">IMMEDIATE THREAT (1-5)</label><select id="urgency" name="urgency">${[1,2,3,4,5].map((n) => `<option value="${n}" ${Number(current.urgency) === n ? 'selected' : ''}>${n} · ${['Low','Guarded','Elevated','Severe','Immediate'][n-1]}</option>`).join('')}</select></div><div class="field"><label for="medical">MEDICAL URGENCY (1-5)</label><select id="medical" name="medical">${[1,2,3,4,5].map((n) => `<option value="${n}" ${Number(current.medical) === n ? 'selected' : ''}>${n} · ${['None reported','Minor','Assistance','Urgent','Life-threatening'][n-1]}</option>`).join('')}</select></div><div class="field"><label for="vulnerable">VULNERABILITY INDICATORS</label><select id="vulnerable" name="vulnerable"><option value="false" ${!current.vulnerable ? 'selected' : ''}>Not reported</option><option value="true" ${current.vulnerable ? 'selected' : ''}>Present / needs review</option></select></div><div class="field full"><label for="medicalRequirements">MEDICAL REQUIREMENTS</label><input id="medicalRequirements" name="medicalRequirements" value="${esc(current.medicalRequirements)}" maxlength="160" placeholder="Medicines, mobility support, first aid"></div><div class="field full"><label for="description">DESCRIPTION *</label><textarea id="description" name="description" maxlength="500" required placeholder="What responders should know">${esc(current.description)}</textarea></div>${RESOURCES.map((res) => `<div class="field"><label for="need_${res.id}">${res.label.toUpperCase()} NEEDED (${res.unit})</label><input type="number" min="0" max="10000" name="need_${res.id}" id="need_${res.id}" value="${current.supplies?.[res.id] || 0}"></div>`).join('')}</div><div class="form-error" id="formError"></div><div class="form-actions"><button type="button" class="button" data-action="close-dialog">Cancel</button><button class="button primary" type="submit">${item ? 'Save changes' : 'Submit incident'}</button></div></form>`);
  }
  function showIncident(item) {
    const score = scoreIncident(item); const assigned = teamById(item.teamId);
    const factors = score.factors.map((factor) => `<div class="factor-row"><span>${factor.name}</span><span class="factor-track"><i style="width:${Math.round(factor.value*100)}%"></i></span><strong>${Math.round(factor.value*factor.weight)}</strong></div>`).join('');
    const actionButtons = `<div class="form-actions">${can('incident.edit') && item.status !== 'Resolved' ? '<button class="button" data-action="edit-incident" data-id="'+esc(item.id)+'">Edit details</button><button class="button" data-action="override-priority" data-id="'+esc(item.id)+'">Override priority</button>' : ''}${can('team.assign') && item.status !== 'Resolved' ? '<button class="button" data-action="assign-incident" data-id="'+esc(item.id)+'">Assign team</button>' : ''}${can('incident.resolve') && item.status !== 'Resolved' ? '<button class="button primary" data-action="resolve-incident" data-id="'+esc(item.id)+'">Resolve incident</button>' : ''}<button class="button" data-action="close-dialog">Close</button></div>`;
    openDialog(item.title, `${item.id} · ${item.category.toUpperCase()} · ${item.location.toUpperCase()}`, `<div class="dialog-body"><div class="priority-detail"><div class="score-ring" style="--score-color:${score.score>=76?'var(--red)':score.score>=56?'var(--orange)':'var(--cyan)'}"><strong>${score.score}</strong><small>OUT OF 100</small></div><div><div>${priorityMarkup(item)}</div><p class="dialog-copy">${esc(score.action)}</p><div class="kicker">UPDATED ${fmtTime(state.lastUpdated)} · ${item.override ? `OVERRIDDEN: ${esc(item.override.reason)}` : 'DETERMINISTIC SCORE'}</div></div></div><div class="kicker">CONTRIBUTING FACTORS / MAX WEIGHTED POINTS</div><div class="factor-list" style="margin-top:10px">${factors}</div><div class="dialog-info"><div class="info-cell"><small>STATUS</small><strong>${esc(item.status)}</strong></div><div class="info-cell"><small>AFFECTED PEOPLE</small><strong>${item.affected}</strong></div><div class="info-cell"><small>ASSIGNED TEAM</small><strong>${esc(assigned?.name || 'Unassigned')}</strong></div><div class="info-cell"><small>WAIT TIME</small><strong>${item.waitHours.toFixed(1)} hours</strong></div><div class="info-cell"><small>MEDICAL NEED</small><strong>${esc(item.medicalRequirements || 'None reported')}</strong></div><div class="info-cell"><small>REPORTED</small><strong>${fmtTime(item.reportedAt)}</strong></div></div><p class="dialog-copy">${esc(item.description)}</p><div class="kicker">REPORTED SUPPLY NEEDS</div><p class="dialog-copy">${RESOURCES.filter((res) => item.supplies?.[res.id] > 0).map((res) => `${res.label}: ${item.supplies[res.id]} ${res.unit}`).join(' · ') || 'No quantities reported'}</p>${actionButtons}<p class="card-meta">Priority weights are demonstration settings, not a validated emergency-response protocol. Human responders make all operational decisions.</p></div>`);
  }
  function submitIncident(form) {
    const fd = new FormData(form); const title = String(fd.get('title') || '').trim(); const location = String(fd.get('location') || '').trim(); const description = String(fd.get('description') || '').trim();
    const affected = Number(fd.get('affected')); const error = document.getElementById('formError');
    if (!title || !location || !description || !Number.isInteger(affected) || affected < 1) { error.textContent = 'Enter a title, location, description, and a valid affected-person count.'; return; }
    const id = form.dataset.id; const prior = id ? incidentById(id) : null;
    const position = illustrativePosition(location);
    const incident = { ...(prior || {}), id: prior?.id || generateId('INC'), title, description, category: fd.get('category'), location, affected, urgency: Number(fd.get('urgency')), medical: Number(fd.get('medical')), vulnerable: fd.get('vulnerable') === 'true', medicalRequirements: String(fd.get('medicalRequirements') || '').trim() || 'None reported', supplies: Object.fromEntries(RESOURCES.map((res) => [res.id, Math.max(0, Number(fd.get(`need_${res.id}`)) || 0)])), reportedAt: prior?.reportedAt || new Date().toISOString(), waitHours: prior?.waitHours || 0, x: prior?.x ?? position.x, y: prior?.y ?? position.y, teamId: prior?.teamId || null, status: prior?.status || 'Open', override: prior?.override || null, scenarioId: prior?.scenarioId || null };
    if (prior) { Object.assign(prior, incident); logActivity(`Incident ${prior.id} updated; priority recalculated.`, 'incident'); }
    else { state.incidents.unshift(incident); logActivity(`New incident ${incident.id} reported: ${incident.title}.`, 'incident'); }
    const result = scoreIncident(incident); if (result.category === 'Critical') openAlert('critical', 'Critical incident requires action', `${incident.title} · ${incident.location}`, 'incident', incident.id);
    save(); closeDialog(); render(); showToast(prior ? 'Incident updated; priority recalculated.' : 'Incident added to the command center.');
  }
  function assignTeam(incidentId, teamId) {
    if (!can('team.assign')) return showToast('This role cannot assign response teams.');
    const incident = incidentById(incidentId); const team = teamById(teamId);
    if (!incident || !team) return showToast('Incident or team could not be found.');
    if (team.status !== 'Available' && team.incidentId !== incident.id) return showToast('That team is unavailable. Choose an available team.');
    if (incident.teamId && incident.teamId !== team.id) { const prior = teamById(incident.teamId); if (prior) { prior.status = 'Available'; prior.incidentId = null; prior.progress = 0; } }
    incident.teamId = team.id; incident.status = 'Assigned'; team.status = 'Assigned'; team.incidentId = incident.id; team.progress = Math.max(team.progress, 10); team.notes = `Assigned to ${incident.id} · ${incident.title}`;
    logActivity(`${team.name} assigned to ${incident.id}.`, 'team'); openAlert('info', 'New team assignment', `${team.name} assigned to ${incident.title}.`, 'incident', incident.id);
    save(); closeDialog(); render(); showToast(`${team.name} assigned to ${incident.id}.`);
  }
  function showAssign(incident) {
    const available = state.teams.filter((team) => team.status === 'Available' || team.incidentId === incident.id);
    openDialog('Assign response team', `INCIDENT ${incident.id}`, `<div class="dialog-body"><p class="dialog-copy">Choose an available team for <strong>${esc(incident.title)}</strong>. Unavailable teams are excluded.</p>${available.length ? available.map((team) => `<article class="recommendation"><div class="recommendation-head"><h3>${esc(team.name)} · ${esc(team.lead)}</h3><span class="status available">AVAILABLE</span></div><p>${team.capability.map(esc).join(' · ')}</p><button class="button small" data-action="confirm-team" data-incident="${esc(incident.id)}" data-team="${esc(team.id)}">Assign team</button></article>`).join('') : '<div class="empty-state"><strong>No available teams</strong><p>Update an existing task before assigning another team.</p></div>'}<div class="form-actions"><button class="button" data-action="close-dialog">Close</button></div></div>`);
  }
  function showTeam(team) {
    if (!can('team.update') && !can('team.assign')) return showToast('This role cannot update team tasks.');
    const incident = team.incidentId ? incidentById(team.incidentId) : null;
    if (team.status === 'Available') {
      const openItems = state.incidents.filter((item) => item.status !== 'Resolved' && !item.teamId);
      openDialog(`Assign ${team.name}`, `TEAM ${team.id}`, `<div class="dialog-body">${openItems.length ? openItems.map((item) => `<article class="recommendation"><div class="recommendation-head"><h3>${esc(item.title)}</h3>${priorityMarkup(item)}</div><p>${esc(item.location)} · ${item.affected} affected</p><button class="button small" data-action="confirm-team" data-incident="${esc(item.id)}" data-team="${esc(team.id)}">Assign this incident</button></article>`).join('') : '<div class="empty-state"><strong>No unassigned incidents</strong></div>'}<div class="form-actions"><button class="button" data-action="close-dialog">Close</button></div></div>`);
      return;
    }
    openDialog(`Update ${team.name}`, `TEAM ${team.id} · ${incident?.id || 'NO INCIDENT'}`, `<form id="teamForm" data-id="${esc(team.id)}"><div class="form-grid"><div class="field"><label for="progress">TASK PROGRESS</label><select id="progress" name="progress">${[10,25,50,75,100].map((value) => `<option value="${value}" ${Number(team.progress) === value ? 'selected' : ''}>${value}%</option>`).join('')}</select></div><div class="field"><label for="taskStatus">STATUS</label><select id="taskStatus" name="status"><option ${team.status === 'Assigned' ? 'selected' : ''}>Assigned</option><option>Available</option></select></div><div class="field full"><label for="notes">COMPLETION / TASK NOTES</label><textarea id="notes" name="notes" maxlength="300">${esc(team.notes)}</textarea></div></div><div class="form-error" id="formError"></div><div class="form-actions"><button type="button" class="button" data-action="close-dialog">Cancel</button><button class="button primary" type="submit">Save task</button></div></form>`);
  }
  function submitTeam(form) {
    const team = teamById(form.dataset.id); const fd = new FormData(form); const status = String(fd.get('status'));
    team.progress = Number(fd.get('progress')); team.notes = String(fd.get('notes') || '').trim();
    if (status === 'Available' || team.progress === 100) {
      const incident = team.incidentId ? incidentById(team.incidentId) : null;
      if (incident && team.progress === 100) { incident.status = 'Resolved'; incident.teamId = team.id; logActivity(`${incident.id} resolved by ${team.name}.`, 'resolved'); openAlert('info', 'Task completed', `${team.name} completed ${incident.id}.`, 'incident', incident.id); }
      else if (incident) { incident.status = 'Open'; incident.teamId = null; }
      team.status = 'Available'; team.incidentId = null; team.progress = 0;
    } else team.status = 'Assigned';
    logActivity(`${team.name} task updated${team.notes ? `: ${team.notes}` : '.'}`, 'team'); save(); closeDialog(); render(); showToast('Team task updated.');
  }
  function resolveIncident(id) {
    if (!can('incident.resolve')) return showToast('This role cannot resolve incidents.');
    const incident = incidentById(id); if (!incident) return;
    incident.status = 'Resolved';
    const team = teamById(incident.teamId); if (team) { team.status = 'Available'; team.incidentId = null; team.progress = 0; team.notes = `Resolved ${incident.id}.`; }
    logActivity(`${incident.id} resolved: ${incident.title}.`, 'resolved'); openAlert('info', 'Incident resolved', `${incident.title} marked resolved.`, 'incident', incident.id);
    save(); closeDialog(); render(); showToast(`${incident.id} resolved.`);
  }
  function allocationForm(defaults = {}) {
    if (!can('allocation.confirm')) return showToast('This role cannot confirm allocations.');
    openDialog('Record resource allocation', 'INVENTORY CONTROL', `<form id="allocationForm"><div class="form-grid"><div class="field"><label for="allocationResource">RESOURCE *</label><select id="allocationResource" name="resource">${RESOURCES.map((item) => `<option value="${item.id}" ${defaults.resource === item.id ? 'selected' : ''}>${item.label} · ${state.inventory[item.id].available} ${item.unit} available</option>`).join('')}</select></div><div class="field"><label for="quantity">QUANTITY *</label><input id="quantity" type="number" name="quantity" min="1" required value="${defaults.quantity || 1}"></div><div class="field"><label for="destination">DESTINATION CAMP *</label><select id="destination" name="camp">${state.camps.map((camp) => `<option value="${camp.id}" ${defaults.camp === camp.id ? 'selected' : ''}>${esc(camp.name)}</option>`).join('')}</select></div><div class="field"><label for="relatedIncident">RELATED INCIDENT</label><select id="relatedIncident" name="incident"><option value="">General camp replenishment</option>${state.incidents.filter((item) => item.status !== 'Resolved').map((item) => `<option value="${item.id}" ${defaults.incident === item.id ? 'selected' : ''}>${esc(item.id)} · ${esc(item.title.slice(0,45))}</option>`).join('')}</select></div></div><div class="form-error" id="formError"></div><div class="form-actions"><button type="button" class="button" data-action="close-dialog">Cancel</button><button class="button primary" type="submit">Review allocation</button></div></form>`);
  }
  function submitAllocation(form) {
    const fd = new FormData(form); const key = String(fd.get('resource')); const amount = Number(fd.get('quantity')); const camp = campById(String(fd.get('camp'))); const error = document.getElementById('formError');
    if (!resource(key) || !Number.isInteger(amount) || amount < 1 || !camp) { error.textContent = 'Choose a valid resource, destination, and positive whole quantity.'; return; }
    if (amount > state.inventory[key].available) { error.textContent = `Insufficient stock. Only ${state.inventory[key].available} ${resource(key).unit} are available.`; return; }
    const incidentId = String(fd.get('incident') || '');
    const allocation = { id: generateId('ALC'), resourceId: key, quantity: amount, campId: camp.id, destination: camp.name, incidentId, at: new Date().toISOString(), confirmedBy: state.role };
    state.inventory[key].available -= amount; state.inventory[key].distributed += amount; camp.stock[key] = (camp.stock[key] || 0) + amount;
    state.allocations.push(allocation); logActivity(`${amount} ${resource(key).unit} ${resource(key).label.toLowerCase()} allocated to ${camp.name}.`, 'allocation');
    openAlert('info', 'Resource allocation confirmed', `${amount} ${resource(key).unit} ${resource(key).label} sent to ${camp.name}.`, 'camp', camp.id);
    refreshShortageAlerts(); save(); closeDialog(); render(); showToast('Allocation confirmed; central and camp stocks updated.');
  }
  function showCamp(camp) {
    const canUpdate = can('camp.update');
    openDialog(camp.name, `${camp.id} · ${camp.location.toUpperCase()}`, `<div class="dialog-body"><div class="dialog-info"><div class="info-cell"><small>OCCUPANCY</small><strong>${camp.occupancy} / ${camp.capacity} · ${Math.round(camp.occupancy/camp.capacity*100)}%</strong></div><div class="info-cell"><small>STAFF</small><strong>${camp.staff}</strong></div><div class="info-cell"><small>STATUS</small><strong>${camp.status}</strong></div><div class="info-cell"><small>REPORTED NEEDS</small><strong>${esc(camp.requirements)}</strong></div></div>${RESOURCES.map((item) => `<div class="stock-row"><span>${item.label}</span><span class="kicker">MIN ${camp.thresholds[item.id]}</span><strong class="${camp.stock[item.id] < camp.thresholds[item.id] ? 'text-red' : ''}">${camp.stock[item.id]} ${item.unit}</strong>${canUpdate ? `<button class="button small" data-action="restock-camp" data-camp="${esc(camp.id)}" data-resource="${item.id}">+ Restock</button>` : ''}</div>`).join('')}<div class="form-actions"><button class="button" data-action="close-dialog">Close</button>${can('allocation.confirm') ? `<button class="button primary" data-action="allocate-to-camp" data-camp="${esc(camp.id)}">Allocate supplies</button>` : ''}</div></div>`);
  }
  function restockCamp(campId, key) {
    if (!can('camp.update')) return showToast('This role cannot update camp stock.');
    const camp = campById(campId); const current = camp.stock[key]; const amount = Number(prompt(`Add ${resource(key).unit} to ${camp.name}:`, '25'));
    if (!Number.isInteger(amount) || amount < 1) return showToast('Enter a positive whole quantity.');
    camp.stock[key] += amount; logActivity(`${camp.name} stock updated: +${amount} ${resource(key).unit} ${resource(key).label.toLowerCase()}.`, 'update'); refreshShortageAlerts(); save(); showCamp(camp); render(); showToast('Camp stock updated.');
  }
  function runSimulation(kind) {
    if (!can('simulation.run')) return showToast('Only the Administrator role can run simulations.');
    if (state.simulations[kind]) return showToast('This scenario has already run. Reset the demo before replaying it.');
    const before = { active: state.incidents.filter((item) => item.status !== 'Resolved').length, shortages: shortageCount(), availableTeams: state.teams.filter((team) => team.status === 'Available').length };
    const scenarios = {
      flood: { category: 'Flood', campId: 'CAMP-01', campChange: { water: -55, blankets: -28 }, incidents: [
        { title: 'Levee breach: lower Northbank block', location: 'East Levee, Northbank', affected: 63, urgency: 5, medical: 4, vulnerable: true, medicalRequirements: 'Two residents need urgent medication and assisted evacuation', supplies: { water: 150, food: 90, medical: 12, blankets: 55, supplies: 16 }, x: 73, y: 37 },
        { title: 'Flooded access road to health post', location: 'Riverside Health Post', affected: 24, urgency: 4, medical: 5, vulnerable: true, medicalRequirements: 'Urgent insulin and wound-care supplies', supplies: { water: 45, food: 20, medical: 25, blankets: 10, supplies: 8 }, x: 58, y: 48 },
      ] },
      earthquake: { category: 'Earthquake', campId: 'CAMP-03', campChange: { medical: -12, blankets: -20 }, incidents: [
        { title: 'Aftershock: structural damage at apartments', location: 'Foundry Square, Old Town', affected: 52, urgency: 5, medical: 5, vulnerable: true, medicalRequirements: 'Triage, bleeding control, and assisted evacuation', supplies: { water: 80, food: 60, medical: 30, blankets: 38, supplies: 45 }, x: 42, y: 54 },
        { title: 'Welfare checks requested after aftershock', location: 'East Old Town', affected: 35, urgency: 3, medical: 2, vulnerable: true, medicalRequirements: 'Mobility check for older residents', supplies: { water: 55, food: 45, medical: 6, blankets: 25, supplies: 14 }, x: 52, y: 63 },
      ] },
      landslide: { category: 'Landslide', campId: 'CAMP-02', campChange: { food: -48, supplies: -24 }, incidents: [
        { title: 'Slope failure blocks Quarry Road', location: 'Quarry Road, West Ridge', affected: 38, urgency: 4, medical: 3, vulnerable: true, medicalRequirements: 'Check isolated homes for injury', supplies: { water: 65, food: 60, medical: 5, blankets: 30, supplies: 36 }, x: 27, y: 65 },
        { title: 'Isolated households need welfare check', location: 'Upper West Ridge', affected: 19, urgency: 3, medical: 3, vulnerable: true, medicalRequirements: 'One household reports a mobility concern', supplies: { water: 35, food: 50, medical: 4, blankets: 24, supplies: 18 }, x: 15, y: 52 },
      ] },
    };
    const config = scenarios[kind]; if (!config) return;
    const camp = campById(config.campId); const created = [];
    config.incidents.forEach((item, index) => {
      const incident = { ...item, id: generateId('INC'), description: `SIMULATION: ${config.category} scenario report. Demonstration incident; verify details before any operational use.`, category: config.category, waitHours: index === 0 ? 0.2 : 0.1, reportedAt: new Date().toISOString(), teamId: null, status: 'Open', override: null, scenarioId: kind };
      state.incidents.unshift(incident); created.push(incident);
      if (scoreIncident(incident).category === 'Critical' || scoreIncident(incident).category === 'High') openAlert(scoreIncident(incident).category === 'Critical' ? 'critical' : 'warning', `${scoreIncident(incident).category} ${config.category.toLowerCase()} incident`, `${incident.title} · ${incident.location}`, 'incident', incident.id);
    });
    Object.entries(config.campChange).forEach(([key, change]) => { camp.stock[key] = Math.max(0, camp.stock[key] + change); });
    const freeTeam = state.teams.find((team) => team.status === 'Available');
    if (freeTeam) { freeTeam.status = 'Assigned'; freeTeam.incidentId = created[0].id; freeTeam.progress = 5; freeTeam.notes = `SIMULATION RESPONSE · ${created[0].title}`; created[0].teamId = freeTeam.id; created[0].status = 'Assigned'; logActivity(`${freeTeam.name} assigned to simulation incident ${created[0].id}.`, 'team'); openAlert('info', 'New team assignment', `${freeTeam.name} assigned to ${created[0].title}.`, 'incident', created[0].id); }
    refreshShortageAlerts();
    const after = { active: state.incidents.filter((item) => item.status !== 'Resolved').length, shortages: shortageCount(), availableTeams: state.teams.filter((team) => team.status === 'Available').length };
    const summary = [{ label: 'ACTIVE INCIDENTS', value: `${before.active} → ${after.active}` }, { label: 'CAMP SHORTAGES', value: `${before.shortages} → ${after.shortages}` }, { label: 'AVAILABLE TEAMS', value: `${before.availableTeams} → ${after.availableTeams}` }];
    state.simulations[kind] = { at: new Date().toISOString(), incidentIds: created.map((item) => item.id), summary };
    logActivity(`${config.category} simulation run: ${created.length} incidents, ${camp.name} stock adjusted, ${freeTeam ? `${freeTeam.name} assigned` : 'no available team'}.`, 'simulation');
    save(); render(); showToast(`${config.category} simulation updated incidents, camp stocks, teams, alerts, and map.`);
  }
  function shortageCount() { return state.camps.reduce((total, camp) => total + Object.keys(camp.stock).filter((key) => camp.stock[key] < camp.thresholds[key]).length, 0); }
  function resetDemo() {
    if (!can('simulation.reset')) return showToast('Only the Administrator role can reset demonstration data.');
    if (!confirm('Reset all demonstration records, stocks, activity, and alerts to the initial dataset?')) return;
    state = freshData(); initialize(); closeDialog(); navigate('dashboard'); showToast('Demonstration data restored to its initial state.');
  }
  function overridePriority(incident) {
    if (!can('incident.edit')) return showToast('This role cannot override incident priorities.');
    const reason = prompt('Override reason (required and recorded):'); if (!reason?.trim()) return showToast('Priority override cancelled; a reason is required.');
    const category = prompt('Enter override category: Critical, High, Moderate, or Routine');
    const normalized = ['Critical','High','Moderate','Routine'].find((item) => item.toLowerCase() === String(category || '').trim().toLowerCase());
    if (!normalized) return showToast('Priority override cancelled; category was not valid.');
    const score = { Critical: 90, High: 68, Moderate: 45, Routine: 20 }[normalized];
    incident.override = { category: normalized, score, reason: reason.trim(), at: new Date().toISOString(), by: state.role };
    logActivity(`${incident.id} priority overridden to ${normalized} by ${state.role}; reason recorded.`, 'update'); save(); showIncident(incident); render(); showToast('Priority override recorded with reason.');
  }
  function openRelated(type, id) {
    if (type === 'incident') { const item = incidentById(id); if (item) showIncident(item); }
    else if (type === 'camp') { const camp = campById(id); if (camp) showCamp(camp); }
    else if (type === 'team') { const team = teamById(id); if (team) showTeam(team); }
    else if (type === 'allocation') navigate('resources');
  }

  document.addEventListener('click', (event) => {
    const pageButton = event.target.closest('[data-page]');
    if (pageButton) { event.preventDefault(); navigate(pageButton.dataset.page); return; }
    const actionButton = event.target.closest('[data-action]'); if (!actionButton) return;
    const { action, id } = actionButton.dataset;
    if (action === 'new-incident') incidentForm();
    else if (action === 'close-dialog') closeDialog();
    else if (action === 'open-incident') { const item = incidentById(id); if (item) showIncident(item); }
    else if (action === 'edit-incident') { const item = incidentById(id); if (item) incidentForm(item); }
    else if (action === 'resolve-incident') resolveIncident(id);
    else if (action === 'assign-incident') { const item = incidentById(id); if (item) showAssign(item); }
    else if (action === 'confirm-team') assignTeam(actionButton.dataset.incident, actionButton.dataset.team);
    else if (action === 'team-detail') { const team = teamById(id); if (team) showTeam(team); }
    else if (action === 'camp-detail') { const camp = campById(id); if (camp) showCamp(camp); }
    else if (action === 'restock-camp') restockCamp(actionButton.dataset.camp, actionButton.dataset.resource);
    else if (action === 'allocate-to-camp') allocationForm({ camp: actionButton.dataset.camp });
    else if (action === 'new-allocation') allocationForm();
    else if (action === 'recommend-allocation') allocationForm({ incident: actionButton.dataset.incident, resource: actionButton.dataset.resource, camp: actionButton.dataset.camp, quantity: actionButton.dataset.quantity });
    else if (action === 'open-related') { const alert = state.alerts.find((item) => item.id === id); if (alert && !alert.read) { alert.read = true; save(); render(); } openRelated(actionButton.dataset.type, id); }
    else if (action === 'mark-all-read') { state.alerts.forEach((item) => { item.read = true; }); save(); render(); }
    else if (action === 'run-simulation') runSimulation(actionButton.dataset.scenario);
    else if (action === 'reset-demo') resetDemo();
    else if (action === 'map-layer') { const layer = actionButton.dataset.layer; activeMapLayers.has(layer) ? activeMapLayers.delete(layer) : activeMapLayers.add(layer); render(); }
    else if (action === 'override-priority') { const item = incidentById(id); if (item) overridePriority(item); }
  });
  document.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target.id === 'incidentForm') submitIncident(event.target);
    if (event.target.id === 'allocationForm') submitAllocation(event.target);
    if (event.target.id === 'teamForm') submitTeam(event.target);
  });
  document.addEventListener('input', (event) => {
    if (event.target.id === 'incidentSearch' || event.target.id === 'incidentStatus' || event.target.id === 'incidentCategory') {
      const query = (document.getElementById('incidentSearch')?.value || '').toLowerCase(); const status = document.getElementById('incidentStatus')?.value || 'all'; const category = document.getElementById('incidentCategory')?.value || 'all';
      const filtered = state.incidents.filter((item) => `${item.id} ${item.title} ${item.location} ${item.category}`.toLowerCase().includes(query) && (status === 'all' || item.status === status) && (category === 'all' || item.category === category)).sort((a,b)=>scoreIncident(b).score-scoreIncident(a).score);
      const target = document.getElementById('incidentTable'); if (target) target.innerHTML = table(filtered);
    }
    if (event.target.id === 'mapSearch') { const target = document.getElementById('mapRecordList'); if (target) target.innerHTML = mapRecords(event.target.value); }
  });
  document.getElementById('roleSelect').addEventListener('change', (event) => { state.role = event.target.value; save(); render(); showToast(`Demo role changed to ${state.role}. Frontend demo permissions only.`); });
  document.getElementById('dialog').addEventListener('click', (event) => { if (event.target.id === 'dialog') closeDialog(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeDialog(); if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); navigate('incidents'); document.getElementById('incidentSearch')?.focus(); } });
  function tickClock() { document.getElementById('clock').textContent = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()); }
  initialize(); render(); tickClock(); setInterval(tickClock, 1000);
})();