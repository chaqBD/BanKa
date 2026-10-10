// 26 fully fictional banks. No real names, logos or figures.
// targetMult / payMult scale the player's target and salary.
// weeklyStress is ambient pressure added once per week regardless of tasks chosen.
// startCompliance is the bank's file-hygiene baseline at the start of a career.
// difficulty is a 1-5 flavour rating shown at bank select.

const BANKS = [
  // --- Tier 1: biggest targets and pay, national networks ---
  { id: 'kora', name: 'Kora', tier: 'Tier 1', cities: ['Lagos', 'Abuja', 'Port Harcourt'], capital: 'strong', targetMult: 1.4, payMult: 1.4, weeklyStress: 7, startCompliance: 75, difficulty: 4 },
  { id: 'obsidian', name: 'Obsidian', tier: 'Tier 1', cities: ['Lagos', 'Abuja', 'Kano'], capital: 'strong', targetMult: 1.45, payMult: 1.45, weeklyStress: 7, startCompliance: 72, difficulty: 4 },
  { id: 'apex_crest', name: 'Apex Crest', tier: 'Tier 1', cities: ['Lagos', 'Ibadan', 'Enugu'], capital: 'strong', targetMult: 1.35, payMult: 1.4, weeklyStress: 6, startCompliance: 78, difficulty: 4 },
  { id: 'tangerine_trust', name: 'Tangerine Trust', tier: 'Tier 1', cities: ['Lagos', 'Abuja', 'Benin'], capital: 'strong', targetMult: 1.5, payMult: 1.5, weeklyStress: 8, startCompliance: 70, difficulty: 5 },
  { id: 'unity_atlantic', name: 'Unity Atlantic', tier: 'Tier 1', cities: ['Lagos', 'Port Harcourt', 'Kaduna'], capital: 'strong', targetMult: 1.4, payMult: 1.35, weeklyStress: 7, startCompliance: 74, difficulty: 4 },

  // --- Tier 2: mixed health, rights issues, merger rumours ---
  { id: 'bluewave', name: 'Bluewave', tier: 'Tier 2', cities: ['Lagos', 'Ibadan'], capital: 'raising', targetMult: 1.05, payMult: 1.0, weeklyStress: 6, startCompliance: 65, difficulty: 3 },
  { id: 'lumen', name: 'Lumen', tier: 'Tier 2', cities: ['Lagos', 'Abuja'], capital: 'strong', targetMult: 1.1, payMult: 1.05, weeklyStress: 5, startCompliance: 70, difficulty: 3 },
  { id: 'sterlix', name: 'Sterlix', tier: 'Tier 2', cities: ['Lagos', 'Onitsha'], capital: 'regulator watch', targetMult: 1.0, payMult: 0.95, weeklyStress: 7, startCompliance: 58, difficulty: 4 },
  { id: 'vela', name: 'Vela', tier: 'Tier 2', cities: ['Lagos', 'Warri'], capital: 'raising', targetMult: 1.0, payMult: 0.95, weeklyStress: 6, startCompliance: 62, difficulty: 3 },
  { id: 'primeleaf', name: 'Primeleaf', tier: 'Tier 2', cities: ['Abuja', 'Jos'], capital: 'strong', targetMult: 0.95, payMult: 0.95, weeklyStress: 5, startCompliance: 68, difficulty: 3 },
  { id: 'ecoline', name: 'Ecoline', tier: 'Tier 2', cities: ['Lagos', 'Calabar'], capital: 'raising', targetMult: 1.05, payMult: 1.0, weeklyStress: 6, startCompliance: 64, difficulty: 3 },
  { id: 'northstar', name: 'Northstar', tier: 'Tier 2', cities: ['Kano', 'Kaduna'], capital: 'regulator watch', targetMult: 0.95, payMult: 0.9, weeklyStress: 7, startCompliance: 55, difficulty: 4 },
  { id: 'keyline', name: 'Keyline', tier: 'Tier 2', cities: ['Lagos', 'Ibadan'], capital: 'strong', targetMult: 1.1, payMult: 1.05, weeklyStress: 5, startCompliance: 69, difficulty: 3 },
  { id: 'harmony', name: 'Harmony', tier: 'Tier 2', cities: ['Port Harcourt', 'Uyo'], capital: 'raising', targetMult: 1.0, payMult: 0.95, weeklyStress: 6, startCompliance: 63, difficulty: 3 },
  { id: 'titanium_trust', name: 'Titanium Trust', tier: 'Tier 2', cities: ['Lagos', 'Abuja'], capital: 'strong', targetMult: 1.15, payMult: 1.1, weeklyStress: 6, startCompliance: 70, difficulty: 4 },
  { id: 'premia_trust', name: 'Premia Trust', tier: 'Tier 2', cities: ['Lagos', 'Benin'], capital: 'regulator watch', targetMult: 1.0, payMult: 0.95, weeklyStress: 7, startCompliance: 57, difficulty: 4 },

  // --- Foreign: premium city branches, highest pay, corporate only ---
  { id: 'stanmore', name: 'Stanmore', tier: 'Foreign', cities: ['Lagos (Victoria Island)'], capital: 'strong', targetMult: 1.55, payMult: 1.75, weeklyStress: 4, startCompliance: 85, difficulty: 4 },
  { id: 'global_metro', name: 'Global Metro', tier: 'Foreign', cities: ['Lagos (Ikoyi)', 'Abuja'], capital: 'strong', targetMult: 1.6, payMult: 1.8, weeklyStress: 4, startCompliance: 83, difficulty: 4 },

  // --- Boutique: few branches, big tickets, HNI and oil money ---
  { id: 'providence_plus', name: 'Providence Plus', tier: 'Boutique', cities: ['Lagos (Ikoyi)'], capital: 'strong', targetMult: 1.3, payMult: 1.5, weeklyStress: 4, startCompliance: 80, difficulty: 3 },
  { id: 'globex', name: 'Globex', tier: 'Boutique', cities: ['Lagos', 'Port Harcourt'], capital: 'strong', targetMult: 1.35, payMult: 1.55, weeklyStress: 5, startCompliance: 78, difficulty: 3 },
  { id: 'signet', name: 'Signet', tier: 'Boutique', cities: ['Abuja (Maitama)'], capital: 'strong', targetMult: 1.25, payMult: 1.5, weeklyStress: 4, startCompliance: 82, difficulty: 3 },

  // --- Regional: lean teams, gentler targets, you do everything ---
  { id: 'parallax', name: 'Parallax', tier: 'Regional', cities: ['Ibadan'], capital: 'raising', targetMult: 0.65, payMult: 0.65, weeklyStress: 3, startCompliance: 66, difficulty: 2 },
  { id: 'optima', name: 'Optima', tier: 'Regional', cities: ['Abeokuta'], capital: 'raising', targetMult: 0.7, payMult: 0.68, weeklyStress: 3, startCompliance: 67, difficulty: 2 },

  // --- Non-interest: northern or south-west footprint, Sharia advisory flavour ---
  { id: 'barakah', name: 'Barakah', tier: 'Non-interest', cities: ['Kano', 'Abuja'], capital: 'strong', targetMult: 0.9, payMult: 0.9, weeklyStress: 4, startCompliance: 76, difficulty: 2 },
  { id: 'noor', name: 'Noor', tier: 'Non-interest', cities: ['Kaduna', 'Ilorin'], capital: 'raising', targetMult: 0.85, payMult: 0.85, weeklyStress: 4, startCompliance: 72, difficulty: 3 },
  { id: 'amanah', name: 'Amanah', tier: 'Non-interest', cities: ['Lagos', 'Ibadan'], capital: 'strong', targetMult: 0.9, payMult: 0.88, weeklyStress: 4, startCompliance: 74, difficulty: 2 }
];
