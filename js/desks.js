// Desk definitions: the three career tracks a player can choose at setup.
// Each task consumes one of the week's three time slots (Morning/Afternoon/Evening)
// and nudges the player's stats. "effects" keys map to Game state stats.

const REST_TASK = {
  id: 'rest',
  name: 'Take a breather',
  flavor: 'Step outside, drink some water, breathe. The queue will still be there.',
  effects: { stress: -10 }
};

const DESKS = [
  {
    id: 'cso',
    name: 'Customer Service Officer',
    short: 'CSO',
    targetUnit: 'Accounts opened',
    baseTarget: 40,
    blurb: 'You run the account-opening desk and the complaints queue. Everyone in the banking hall is your problem today.',
    tasks: [
      { id: 'account_opening', name: 'Account-opening desk', flavor: 'Forms, forms, and a BVN that refuses to link.', effects: { targetProgress: 6, stress: 5 } },
      { id: 'balogun_storm', name: 'Balogun market storm', flavor: 'Forty traders arrive at once, all needing the same thing: now.', effects: { targetProgress: 10, stress: 12, compliance: -3 } },
      { id: 'complaints_queue', name: 'Complaints queue', flavor: 'A failed transfer, a blocked card, and a man who wants to see your oga.', effects: { goodwill: 4, stress: 6 } },
      { id: 'kyc_backlog', name: 'KYC backlog', flavor: 'Old files, missing utility bills, a stack that never shrinks.', effects: { compliance: 8, stress: 5 } },
      { id: 'atm_disputes', name: 'ATM disputes', flavor: 'The machine ate someone\'s card. Again.', effects: { goodwill: 3, stress: 4, targetProgress: 2 } }
    ]
  },
  {
    id: 'rm',
    name: 'Relationship Manager',
    short: 'RM',
    targetUnit: 'Deposits (₦M)',
    baseTarget: 50,
    blurb: 'You chase deposits across Lagos: HNIs, government MDAs, church treasurers and SMEs. The road is your office.',
    tasks: [
      { id: 'lekki_hni', name: 'Lekki HNI visit', flavor: 'A big account, a longer wait in the gatehouse, and a driveway full of German cars.', effects: { targetProgress: 14, stress: 10 } },
      { id: 'mda_chase', name: 'Government MDA chase', flavor: 'The permanent secretary is "in a meeting" every single time.', effects: { targetProgress: 10, stress: 8, compliance: -2 } },
      { id: 'church_treasurer', name: 'Church treasurer visit', flavor: 'Three hours of fellowship before anyone mentions numbers.', effects: { targetProgress: 6, goodwill: 5, stress: 4 } },
      { id: 'rollovers', name: 'Rollovers', flavor: 'Renewing fixed deposits before they walk to a rival bank.', effects: { targetProgress: 5, compliance: 4, stress: 3 } },
      { id: 'sme_loan', name: 'SME loan pitch', flavor: 'A promising business, thin paperwork, a Friday deadline.', effects: { targetProgress: 9, stress: 9, compliance: -3 } }
    ]
  },
  {
    id: 'bm',
    name: 'Branch Manager',
    short: 'BM',
    targetUnit: 'Branch performance score',
    baseTarget: 45,
    blurb: 'The branch is yours now. Staff, numbers, audits and the Regional Director all answer to your desk.',
    tasks: [
      { id: 'morning_briefing', name: 'Chair the morning briefing', flavor: 'Set the tone for the floor before the first customer walks in.', effects: { targetProgress: 7, stress: 5 } },
      { id: 'staff_numbers_review', name: 'Review staff numbers', flavor: 'Catching a gap on Tuesday beats explaining it at MPR.', effects: { targetProgress: 5, compliance: 7, stress: 5 } },
      { id: 'escalated_customer', name: 'Handle an escalated customer', flavor: 'Nobody below you could calm this one down.', effects: { goodwill: 5, stress: 7 } },
      { id: 'big_ticket_signoff', name: 'Sign off big-ticket approvals', flavor: 'Your signature, your risk. Read the file properly.', effects: { targetProgress: 10, stress: 8, compliance: -2 } },
      { id: 'ed_regulator_prep', name: 'Prepare for an ED or regulator visit', flavor: 'Every file needs to be clean before they walk in.', effects: { targetProgress: 4, compliance: 9, stress: 9 } }
    ]
  }
];

// Maps a grade index (see GRADES in game.js) to the desk the player works that month.
// Executive Trainee / Banking Officer / Senior Banking Officer -> Customer Service Officer
// Assistant Manager / Deputy Manager                           -> Relationship Manager
// Manager / Assistant General Manager                          -> Branch Manager
const GRADE_DESK_IDS = ['cso', 'cso', 'cso', 'rm', 'rm', 'bm', 'bm'];
