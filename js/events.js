// ~25 end-of-week event cards across 5 categories.
// Each choice carries "effects" applied to Game state stats, and an optional
// "endGame" flag for a special alternate ending (used by the headhunter event).

const EVENTS = [
  // --- Branch life ---
  {
    id: 'network_down', category: 'Branch life', title: 'Network don go',
    desc: 'The core banking app freezes mid-transaction. The queue is not moving and nobody is smiling.',
    choices: [
      { label: 'Wait it out', effects: { stress: 5 } },
      { label: 'Improvise with a manual ledger', effects: { targetProgress: 3, compliance: -4, stress: 3 } },
      { label: 'Send customers to another branch', effects: { goodwill: -5, stress: -2 } }
    ]
  },
  {
    id: 'third_mainland', category: 'Branch life', title: 'Third Mainland Bridge',
    desc: 'Traffic has turned the bridge into a parking lot. You are an hour from resumption and counting.',
    choices: [
      { label: 'Leave home early tomorrow, push through today', effects: { stress: 4, goodwill: -5 } },
      { label: 'Call the BM and explain', effects: { goodwill: -2, stress: 2 } },
      { label: 'Work from a café near the bridge', effects: { targetProgress: 2, stress: 2 } }
    ]
  },
  {
    id: 'ed_on_floor', category: 'Branch life', title: 'ED on the floor',
    desc: 'The Executive Director walks in unannounced, trailed by two people with clipboards.',
    choices: [
      { label: 'Volunteer to present the branch numbers', effects: { targetProgress: 4, goodwill: 6, stress: 8 } },
      { label: 'Keep your head down', effects: { stress: 2 } },
      { label: 'Impress with a sharp answer when asked', effects: { goodwill: 10, stress: 6 } }
    ]
  },
  {
    id: 'surprise_audit', category: 'Branch life', title: 'Surprise audit',
    desc: 'Internal Control is at the branch, pulling files at random. Yours is in the pile.',
    choices: [
      { label: 'Pull an all-nighter to fix the gaps first', effects: { compliance: 10, stress: 12 } },
      { label: 'Own up and explain the gap', effects: { compliance: 2, goodwill: -2, stress: 4 } },
      { label: 'Hope they do not open that file', effects: { compliance: -10, stress: 8 } }
    ]
  },
  {
    id: 'power_outage', category: 'Branch life', title: 'NEPA has taken light',
    desc: 'The whole street goes dark. The generator coughs twice before catching.',
    choices: [
      { label: 'Switch to the generator, keep serving', effects: { balance: -2000, stress: 3 } },
      { label: 'Work by phone torchlight', effects: { stress: 6, targetProgress: 1 } },
      { label: 'Send everyone home early', effects: { goodwill: -4, stress: -6 } }
    ]
  },

  // --- Ethics ---
  {
    id: 'envelope', category: 'Ethics', title: 'The envelope',
    desc: 'A customer slides an envelope across the desk. ₦50,000, if you skip a few KYC steps.',
    choices: [
      { label: 'Collect it', effects: { balance: 50000, compliance: -15, stress: -2 } },
      { label: 'Refuse politely', effects: { compliance: 5, goodwill: 2 } },
      { label: 'Report it to Internal Control', effects: { compliance: 10, goodwill: -5, stress: 4 } }
    ]
  },
  {
    id: 'atm_complaint_till', category: 'Ethics', title: 'Pay the ATM complaint from the till',
    desc: 'A customer swears the machine swallowed ₦20,000. The queue behind them is getting loud.',
    choices: [
      { label: 'Pay from the till to calm things down', effects: { goodwill: 6, compliance: -8 } },
      { label: 'Follow the proper reversal process', effects: { compliance: 6, goodwill: -3, stress: 4 } },
      { label: 'Escalate to the ATM team', effects: { stress: 2 } }
    ]
  },
  {
    id: 'recycle_deck', category: 'Ethics', title: "Recycle last quarter's deck",
    desc: 'The MPR deck is due in an hour and last quarter\'s numbers are "close enough."',
    choices: [
      { label: 'Reuse it, nobody will notice', effects: { stress: -6, targetProgress: -2 } },
      { label: 'Update it properly', effects: { stress: 6, targetProgress: 4 } },
      { label: 'Ask a colleague to help update it', effects: { stress: 3, targetProgress: 3, goodwill: 2 } }
    ]
  },
  {
    id: 'backdate_form', category: 'Ethics', title: 'A backdated form',
    desc: 'A VIP customer wants a form backdated to avoid a penalty. "It is a small thing," he says.',
    choices: [
      { label: 'Backdate it', effects: { balance: 20000, compliance: -12, goodwill: 4 } },
      { label: 'Refuse', effects: { compliance: 6, goodwill: -6 } },
      { label: 'Offer a compliant workaround', effects: { compliance: 2, goodwill: 2, stress: 4 } }
    ]
  },
  {
    id: 'waive_fee', category: 'Ethics', title: 'A friend asks for a favour',
    desc: 'An old friend wants a maintenance fee waived. "You can just do it now now."',
    choices: [
      { label: 'Waive it quietly', effects: { goodwill: 3, compliance: -6, balance: -1500 } },
      { label: 'Explain that you cannot', effects: { compliance: 3, goodwill: -2 } },
      { label: 'Escalate to the BM for approval', effects: { stress: 3, compliance: 4 } }
    ]
  },

  // --- Social ---
  {
    id: 'owambe', category: 'Social', title: 'Owambe aso-ebi',
    desc: 'A colleague is getting married. The aso-ebi WhatsApp group will not stop buzzing.',
    choices: [
      { label: 'Buy the aso-ebi and attend', effects: { balance: -15000, stress: -8, goodwill: 5 } },
      { label: 'Attend without the aso-ebi', effects: { goodwill: -3, stress: -3 } },
      { label: 'Skip it entirely', effects: { stress: -5, goodwill: -6 } }
    ]
  },
  {
    id: 'church_service', category: 'Social', title: 'Three hours for one account',
    desc: 'A church treasurer invites you to "observe service" before any talk of numbers.',
    choices: [
      { label: 'Sit through the whole service', effects: { targetProgress: 8, stress: 6 } },
      { label: 'Greet, then leave early', effects: { targetProgress: 3, goodwill: -3 } },
      { label: 'Decline the invite', effects: { targetProgress: -2 } }
    ]
  },
  {
    id: 'japa_season', category: 'Social', title: 'Japa season',
    desc: 'Your desk partner hands in her resignation letter. Her files are now, somehow, your files.',
    choices: [
      { label: 'Cover her workload', effects: { targetProgress: 4, stress: 10, goodwill: 5 } },
      { label: 'Tell the BM you cannot absorb it all', effects: { stress: -2, goodwill: -4 } },
      { label: 'Quietly let some tasks slide', effects: { compliance: -4, stress: -4 } }
    ]
  },
  {
    id: 'wedding_gift_pool', category: 'Social', title: "Office pool for a wedding gift",
    desc: 'The WhatsApp group is collecting for a colleague\'s wedding. Everyone can see who has paid.',
    choices: [
      { label: 'Contribute generously', effects: { balance: -10000, goodwill: 6 } },
      { label: 'Contribute the minimum', effects: { balance: -2000, goodwill: 1 } },
      { label: 'Opt out', effects: { goodwill: -4 } }
    ]
  },
  {
    id: 'naming_ceremony', category: 'Social', title: 'Naming ceremony invite',
    desc: 'A big client invites you to his child\'s naming ceremony. It is a Thursday afternoon.',
    choices: [
      { label: 'Attend with a gift', effects: { balance: -8000, targetProgress: 6, stress: 3 } },
      { label: 'Send a gift only', effects: { balance: -4000, targetProgress: 2 } },
      { label: 'Decline', effects: { targetProgress: -3, goodwill: -2 } }
    ]
  },

  // --- Money ---
  {
    id: 'staff_car_loan', category: 'Money', title: 'Staff car loan offer',
    desc: 'HR is pushing the staff car loan scheme again. The deduction will hurt, a little, every month.',
    choices: [
      { label: 'Take the loan', effects: { balance: 500000, stress: 4 } },
      { label: 'Decline', effects: { stress: -2 } },
      { label: 'Ask HR for better terms', effects: { stress: 3 } }
    ]
  },
  {
    id: 'rights_issue', category: 'Money', title: 'Rights issue via salary deduction',
    desc: 'The bank is raising capital and "encouraging" staff to subscribe to the rights issue.',
    choices: [
      { label: 'Subscribe fully', effects: { balance: -30000, goodwill: 5 } },
      { label: 'Subscribe partially', effects: { balance: -10000, goodwill: 2 } },
      { label: 'Decline', effects: { goodwill: -6 } }
    ]
  },
  {
    id: 'salary_advance', category: 'Money', title: 'Tempted by a salary advance',
    desc: 'Rent is due and payday is two weeks away. The salary advance portal is right there.',
    choices: [
      { label: 'Take it', effects: { balance: 40000, stress: 6 } },
      { label: 'Avoid it', effects: { stress: -2 } },
      { label: 'Ask for a smaller advance', effects: { balance: 15000, stress: 2 } }
    ]
  },
  {
    id: 'colleague_borrows', category: 'Money', title: 'A colleague borrows money',
    desc: '"Just till salary enters," she says. You have heard this before.',
    choices: [
      { label: 'Lend it', effects: { balance: -10000, goodwill: 4 } },
      { label: 'Politely decline', effects: { goodwill: -2 } },
      { label: 'Lend half', effects: { balance: -5000, goodwill: 2 } }
    ]
  },
  {
    id: 'bonus_delayed', category: 'Money', title: 'Bonus payment delayed',
    desc: 'The quarterly bonus was supposed to hit accounts today. It did not.',
    choices: [
      { label: 'Complain to HR', effects: { stress: 4, goodwill: -3 } },
      { label: 'Wait patiently', effects: { stress: 2 } },
      { label: 'Vent to colleagues', effects: { stress: -3, goodwill: -2 } }
    ]
  },

  // --- Bank-wide ---
  {
    id: 'merger_rumours', category: 'Bank-wide', title: 'Merger rumours',
    desc: 'A blog post claims your bank is in merger talks. Customers start calling to ask if their money is safe.',
    choices: [
      { label: 'Reassure customers at the counter', effects: { goodwill: 6, stress: 4 } },
      { label: 'Start job hunting quietly', effects: { stress: -3, goodwill: -4 } },
      { label: 'Ignore the noise', effects: { stress: 2 } }
    ]
  },
  {
    id: 'depositors_panic', category: 'Bank-wide', title: 'Depositors panic after a viral tweet',
    desc: 'A tweet about the bank has 10,000 retweets by lunchtime. The banking hall is suddenly full.',
    choices: [
      { label: 'Calm customers at the counter', effects: { goodwill: 8, stress: 10 } },
      { label: 'Direct them to the call centre', effects: { stress: 2, goodwill: -2 } },
      { label: 'Close the banking hall early', effects: { goodwill: -8, stress: -5 } }
    ]
  },
  {
    id: 'board_dissolved', category: 'Bank-wide', title: 'Board dissolved',
    desc: 'The regulator dissolves the board overnight. The news breaks before most staff reach the office.',
    choices: [
      { label: 'Keep calm and keep working', effects: { stress: 5 } },
      { label: 'Join colleagues discussing exit plans', effects: { stress: -2, goodwill: -3 } },
      { label: 'Reassure your team', effects: { goodwill: 5, stress: 6 } }
    ]
  },
  {
    id: 'branch_closures', category: 'Bank-wide', title: 'Branch closures announced',
    desc: 'Head Office announces a round of branch closures to cut costs. Yours is not confirmed safe.',
    choices: [
      { label: 'Volunteer to relocate', effects: { stress: 6, targetProgress: 3 } },
      { label: 'Apply for a transfer', effects: { stress: 3 } },
      { label: 'Wait and see', effects: { stress: 4 } }
    ]
  },
  {
    id: 'headhunter_offer', category: 'Bank-wide', title: 'Headhunter offer',
    desc: 'A recruiter calls with an offer from a rival bank: better pay, harder targets.',
    choices: [
      { label: 'Use it to negotiate a raise here', effects: { balance: 30000, stress: 4 } },
      { label: 'Take the offer and resign', effects: {}, endGame: 'resigned' },
      { label: 'Decline and stay loyal', effects: { goodwill: 6, stress: -2 } }
    ]
  }
];
