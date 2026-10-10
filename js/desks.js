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
    id: 'hoa',
    name: 'Head Office Analyst',
    short: 'HOA',
    targetUnit: 'Deliverables',
    baseTarget: 35,
    blurb: 'You live in spreadsheets and decks: MPR packs, CBN returns, suspense accounts. Head Office deadlines do not move.',
    tasks: [
      { id: 'mpr_deck', name: 'MPR deck for the ED', flavor: 'Forty slides due by 6pm, half the numbers still missing.', effects: { targetProgress: 9, stress: 10, goodwill: 3 } },
      { id: 'gl_recon', name: 'Suspense GL reconciliation', flavor: 'An unexplained ₦2.3 million sitting in suspense since March.', effects: { targetProgress: 6, compliance: 9, stress: 6 } },
      { id: 'cbn_returns', name: 'CBN returns', flavor: 'The regulator does not accept "network was down" as an excuse.', effects: { targetProgress: 8, compliance: 5, stress: 9 } },
      { id: 'it_downtime', name: 'IT downtime firefighting', flavor: 'The core banking app is "thinking" again.', effects: { stress: 8, goodwill: 4 } },
      { id: 'quick_meetings', name: '"Quick" meetings', flavor: 'This one will take fifteen minutes, they said.', effects: { stress: 6, targetProgress: 1 } }
    ]
  }
];
