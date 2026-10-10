// 60 end-of-week event cards across 5 categories.
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
  },

  // --- Branch life (more) ---
  {
    id: 'generator_fuel', category: 'Branch life', title: "Generator don finish fuel",
    desc: 'The generator sputters and dies. NEPA is nowhere near.',
    choices: [
      { label: 'Send someone to buy fuel quickly', effects: { balance: -5000, stress: 2 } },
      { label: 'Close the till till evening', effects: { goodwill: -4, stress: -3 } },
      { label: 'Work off laptop batteries', effects: { stress: 4, targetProgress: 1 } }
    ]
  },
  {
    id: 'rainy_season', category: 'Branch life', title: 'Rainy season flooding',
    desc: 'Lagos rain floods the banking hall entrance ankle-deep.',
    choices: [
      { label: 'Help mop and keep serving', effects: { stress: 5, goodwill: 4 } },
      { label: 'Shut the doors till it eases', effects: { goodwill: -3, stress: -4 } },
      { label: 'Wade through and open as usual', effects: { stress: 6, targetProgress: 2 } }
    ]
  },
  {
    id: 'fire_drill', category: 'Branch life', title: 'Surprise fire drill',
    desc: 'The alarm goes off. Nobody told the floor it was only a drill.',
    choices: [
      { label: 'Lead your section calmly', effects: { goodwill: 5, stress: 4 } },
      { label: 'Grumble about the lost time', effects: { stress: -2, goodwill: -2 } },
      { label: 'Use the break to catch your breath', effects: { stress: -6 } }
    ]
  },
  {
    id: 'new_pos_machine', category: 'Branch life', title: "New POS machine won't connect",
    desc: 'The shiny new terminal refuses to find the network.',
    choices: [
      { label: 'Troubleshoot it yourself', effects: { stress: 5, targetProgress: 2 } },
      { label: 'Call IT and wait', effects: { stress: 3 } },
      { label: 'Switch customers to manual receipts', effects: { compliance: -3, goodwill: 2 } }
    ]
  },
  {
    id: 'long_queue_viral', category: 'Branch life', title: 'The queue goes viral',
    desc: 'Someone filmed the queue stretching out the door and posted it online.',
    choices: [
      { label: 'Work faster to clear it', effects: { stress: 7, targetProgress: 3 } },
      { label: 'Ignore the camera, continue normally', effects: { stress: 2 } },
      { label: 'Ask security to manage the crowd', effects: { goodwill: 3, stress: 3 } }
    ]
  },
  {
    id: 'air_conditioner_down', category: 'Branch life', title: 'AC packs up',
    desc: 'The air conditioning dies and the hall turns into an oven.',
    choices: [
      { label: 'Push through the heat', effects: { stress: 7 } },
      { label: 'Request a fan from facilities', effects: { balance: -3000, stress: -2 } },
      { label: 'Let frustration show with customers', effects: { goodwill: -5, stress: -3 } }
    ]
  },
  {
    id: 'courier_delay', category: 'Branch life', title: 'Cash delivery is late',
    desc: 'The vault delivery from Head Office is running hours behind.',
    choices: [
      { label: 'Reassure customers waiting for cash', effects: { goodwill: 5, stress: 4 } },
      { label: 'Restrict withdrawals for the day', effects: { goodwill: -6, compliance: 3 } },
      { label: 'Borrow cash from a sister branch', effects: { stress: 5, targetProgress: 1 } }
    ]
  },

  // --- Ethics (more) ---
  {
    id: 'ghost_account', category: 'Ethics', title: 'A "ghost" account surfaces',
    desc: 'You find an account opened under unclear approval, with no proper file.',
    choices: [
      { label: 'Flag it to Internal Control', effects: { compliance: 9, goodwill: -3, stress: 4 } },
      { label: 'Quietly close it yourself', effects: { compliance: 3, stress: 2 } },
      { label: "Leave it, it's not your file", effects: { compliance: -6 } }
    ]
  },
  {
    id: 'padded_expense', category: 'Ethics', title: 'A padded expense claim',
    desc: 'Your BM asks you to pad a small expense claim for "team welfare."',
    choices: [
      { label: 'Refuse', effects: { compliance: 4, goodwill: -4 } },
      { label: 'Go along with it', effects: { balance: 3000, compliance: -7 } },
      { label: 'Suggest a transparent alternative', effects: { compliance: 2, goodwill: 1, stress: 3 } }
    ]
  },
  {
    id: 'insider_tip', category: 'Ethics', title: 'An insider tip',
    desc: 'A friend in Credit hints that a big customer is about to default.',
    choices: [
      { label: 'Warn your own clients quietly', effects: { balance: 10000, compliance: -10 } },
      { label: 'Say nothing', effects: { compliance: 3 } },
      { label: 'Report the leak', effects: { compliance: 6, goodwill: -3 } }
    ]
  },
  {
    id: 'favoritism_promotion', category: 'Ethics', title: 'Favouritism in a promotion',
    desc: 'The BM promotes a less-qualified colleague who happens to be a favourite.',
    choices: [
      { label: 'Speak up about it', effects: { goodwill: -5, stress: 4 } },
      { label: 'Stay quiet and keep working', effects: { stress: 2 } },
      { label: 'Raise it privately with HR', effects: { stress: 5, compliance: 2 } }
    ]
  },
  {
    id: 'fake_testimonial', category: 'Ethics', title: 'A dishonest reference letter',
    desc: 'A customer asks you to write a reference letter overstating their account history.',
    choices: [
      { label: 'Write it', effects: { balance: 10000, compliance: -9, goodwill: 2 } },
      { label: 'Decline', effects: { compliance: 4, goodwill: -2 } },
      { label: 'Offer an honest letter instead', effects: { compliance: 2, goodwill: 1 } }
    ]
  },
  {
    id: 'shred_the_memo', category: 'Ethics', title: 'Shred the memo',
    desc: 'An old compliance memo contradicts what the branch has been doing. Someone suggests shredding it.',
    choices: [
      { label: 'Shred it', effects: { compliance: -12, stress: -3 } },
      { label: 'Keep it on file', effects: { compliance: 5, stress: 3 } },
      { label: 'Report the contradiction upward', effects: { compliance: 8, goodwill: -4, stress: 5 } }
    ]
  },
  {
    id: 'whistleblower_choice', category: 'Ethics', title: 'A colleague asks you to stay quiet',
    desc: 'A colleague who cut corners asks you not to mention it if Internal Control asks.',
    choices: [
      { label: 'Agree to stay quiet', effects: { compliance: -6, goodwill: 3 } },
      { label: 'Tell the truth if asked', effects: { compliance: 5, goodwill: -4 } },
      { label: 'Warn the colleague to fix it first', effects: { compliance: 2, stress: 3 } }
    ]
  },

  // --- Social (more) ---
  {
    id: 'birthday_harambee', category: 'Social', title: 'Office birthday harambee',
    desc: "It's a colleague's birthday and the contribution basket is going round.",
    choices: [
      { label: 'Contribute happily', effects: { balance: -3000, goodwill: 3 } },
      { label: 'Give a token amount', effects: { balance: -500, goodwill: 1 } },
      { label: 'Skip it', effects: { goodwill: -2 } }
    ]
  },
  {
    id: 'send_off_party', category: 'Social', title: "A colleague's send-off",
    desc: 'A long-serving colleague is retiring. There is a send-off planned.',
    choices: [
      { label: 'Help organise it', effects: { stress: 5, goodwill: 5 } },
      { label: 'Attend only', effects: { balance: -2000, goodwill: 2 } },
      { label: "Can't make it", effects: { goodwill: -3 } }
    ]
  },
  {
    id: 'village_meeting', category: 'Social', title: 'Emergency village meeting',
    desc: 'Your hometown union calls an emergency meeting for the weekend.',
    choices: [
      { label: 'Travel down for it', effects: { stress: 6, balance: -6000, goodwill: 3 } },
      { label: 'Send your dues instead', effects: { balance: -8000 } },
      { label: 'Skip it entirely', effects: { stress: -3, goodwill: -2 } }
    ]
  },
  {
    id: 'jollof_debate', category: 'Social', title: 'The jollof rice debate',
    desc: 'The office WhatsApp group has derailed into a jollof rice debate mid-week.',
    choices: [
      { label: 'Join in for the laughs', effects: { stress: -5 } },
      { label: 'Mute the group and focus', effects: { targetProgress: 2, stress: 2 } },
      { label: 'Settle the debate once and for all', effects: { stress: -4, goodwill: 2 } }
    ]
  },
  {
    id: 'uncle_wedding', category: 'Social', title: "Uncle's wedding",
    desc: 'Your uncle is getting married this weekend and the whole family is expected.',
    choices: [
      { label: 'Attend with a gift', effects: { balance: -12000, stress: -6 } },
      { label: 'Send a gift, skip the trip', effects: { balance: -5000 } },
      { label: "Decline, too much work", effects: { stress: 3, goodwill: -2 } }
    ]
  },
  {
    id: 'office_crush', category: 'Social', title: 'Office crush drama',
    desc: "Office gossip has paired you with a colleague you've barely spoken to.",
    choices: [
      { label: 'Laugh it off', effects: { stress: -3 } },
      { label: 'Address it directly', effects: { stress: 2, goodwill: 1 } },
      { label: 'Let it slide', effects: { stress: 1 } }
    ]
  },
  {
    id: 'football_viewing_centre', category: 'Social', title: 'Big match today',
    desc: 'A big match is on and half the branch wants to close early to watch it.',
    choices: [
      { label: 'Join everyone at the viewing centre', effects: { stress: -6, goodwill: 2 } },
      { label: 'Stay back and finish pending work', effects: { targetProgress: 4, stress: 3 } },
      { label: 'Report the early closures', effects: { compliance: 3, goodwill: -4 } }
    ]
  },

  // --- Money (more) ---
  {
    id: 'forex_hustle', category: 'Money', title: 'A side forex hustle',
    desc: 'A friend offers to cut you into a side forex trading hustle.',
    choices: [
      { label: 'Invest a little', effects: { balance: -20000, stress: 4 } },
      { label: 'Invest heavily', effects: { balance: -60000, stress: 7 } },
      { label: 'Decline', effects: { stress: -1 } }
    ]
  },
  {
    id: 'pension_contribution', category: 'Money', title: 'Pension shortfall',
    desc: 'HR flags a shortfall in your pension contribution history.',
    choices: [
      { label: 'Fix it immediately', effects: { balance: -15000, compliance: 3 } },
      { label: 'Postpone it', effects: { compliance: -2, stress: 3 } },
      { label: "Query HR's calculation", effects: { stress: 4 } }
    ]
  },
  {
    id: 'data_subscription', category: 'Money', title: 'Transport and data costs',
    desc: 'Fuel and data subscription costs have quietly eaten into your salary.',
    choices: [
      { label: 'Cut back on extras', effects: { stress: 3 } },
      { label: 'Take on a side gig for extra cash', effects: { balance: 15000, stress: 6 } },
      { label: 'Absorb it and move on', effects: { stress: 2 } }
    ]
  },
  {
    id: 'investment_club', category: 'Money', title: 'The office ajo',
    desc: 'Colleagues are forming an ajo contribution club and want you in.',
    choices: [
      { label: 'Join', effects: { balance: -10000, goodwill: 3 } },
      { label: 'Decline politely', effects: { goodwill: -1 } },
      { label: 'Join with a smaller commitment', effects: { balance: -4000, goodwill: 1 } }
    ]
  },
  {
    id: 'tax_audit_personal', category: 'Money', title: 'A personal tax audit letter',
    desc: 'A tax audit letter arrives at the worst possible time.',
    choices: [
      { label: 'Hire an accountant to sort it', effects: { balance: -25000, stress: -3 } },
      { label: 'Handle it yourself', effects: { stress: 8 } },
      { label: 'Ignore it for now', effects: { stress: 4, compliance: -2 } }
    ]
  },
  {
    id: 'bonus_rumour', category: 'Money', title: 'Bonus rumour',
    desc: 'Rumours say this year\'s bonus will be smaller than usual.',
    choices: [
      { label: 'Brace for it and budget accordingly', effects: { stress: 2 } },
      { label: 'Complain in the office group chat', effects: { stress: -2, goodwill: -2 } },
      { label: 'Ask the BM directly', effects: { stress: 3, goodwill: 1 } }
    ]
  },
  {
    id: 'generous_tipper', category: 'Money', title: 'A generous tip',
    desc: 'A wealthy customer, pleased with your service, slips you a generous tip.',
    choices: [
      { label: 'Accept it graciously', effects: { balance: 20000, goodwill: 2 } },
      { label: 'Decline politely', effects: { goodwill: 3 } },
      { label: 'Report it to avoid any appearance of favouritism', effects: { compliance: 4, goodwill: -1 } }
    ]
  },

  // --- Bank-wide (more) ---
  {
    id: 'cbn_policy_change', category: 'Bank-wide', title: 'Surprise CBN policy change',
    desc: 'The CBN announces a policy change effective immediately, with no warning.',
    choices: [
      { label: 'Scramble to implement it correctly', effects: { compliance: 8, stress: 8 } },
      { label: 'Wait for Head Office guidance', effects: { stress: 2 } },
      { label: 'Guess and hope it is close enough', effects: { compliance: -6, stress: 3 } }
    ]
  },
  {
    id: 'core_banking_migration', category: 'Bank-wide', title: 'Core banking migration',
    desc: 'The bank is migrating to a new core banking system this weekend.',
    choices: [
      { label: 'Volunteer for the weekend testing team', effects: { stress: 8, goodwill: 5 } },
      { label: 'Stay out of it', effects: { stress: -2 } },
      { label: 'Flag concerns about the timeline', effects: { compliance: 4, goodwill: -2 } }
    ]
  },
  {
    id: 'new_ceo', category: 'Bank-wide', title: 'A new CEO is announced',
    desc: 'The incoming CEO has a reputation for sweeping changes.',
    choices: [
      { label: 'Wait and watch', effects: { stress: 2 } },
      { label: 'Position yourself for visibility', effects: { stress: 5, goodwill: 4 } },
      { label: 'Start networking outside the bank, just in case', effects: { stress: -2, goodwill: -2 } }
    ]
  },
  {
    id: 'strike_warning', category: 'Bank-wide', title: 'Union strike warning',
    desc: 'The union issues a strike warning over unpaid allowances.',
    choices: [
      { label: "Support the union's position", effects: { goodwill: -3, stress: 2 } },
      { label: 'Stay neutral', effects: { stress: 1 } },
      { label: 'Side openly with management', effects: { goodwill: 4, stress: 3 } }
    ]
  },
  {
    id: 'fintech_competition', category: 'Bank-wide', title: 'A fintech is poaching your customers',
    desc: 'A flashy fintech app is luring your best customers with instant loans.',
    choices: [
      { label: 'Pitch them on staying for the personal service', effects: { targetProgress: 5, stress: 5 } },
      { label: "Let them go, not your problem", effects: { targetProgress: -3 } },
      { label: 'Report the trend to management', effects: { goodwill: 3, stress: 2 } }
    ]
  },
  {
    id: 'rebrand_announcement', category: 'Bank-wide', title: 'A full rebrand',
    desc: 'The bank announces a rebrand: new logo, new colours, new slogan.',
    choices: [
      { label: 'Embrace the change publicly', effects: { goodwill: 4, stress: 3 } },
      { label: 'Grumble about another pointless cost', effects: { stress: -2, goodwill: -2 } },
      { label: 'Suggest improvements through the proper channel', effects: { goodwill: 2, stress: 3 } }
    ]
  },
  {
    id: 'award_night', category: 'Bank-wide', title: 'Bank of the Year gala',
    desc: 'The bank wins an industry award and throws a gala night.',
    choices: [
      { label: 'Attend and network', effects: { balance: -10000, goodwill: 5, stress: -4 } },
      { label: 'Skip it, too tired', effects: { stress: -3 } },
      { label: 'Attend briefly then leave', effects: { balance: -5000, goodwill: 2, stress: -2 } }
    ]
  }
];
