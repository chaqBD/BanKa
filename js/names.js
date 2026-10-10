// Name and mood generation for the two recurring NPCs: the Branch Manager (BM)
// and the Regional Director (RD). Both are randomised per career so no two
// playthroughs feel identical.

const FIRST_NAMES = [
  'Funke', 'Ngozi', 'Aisha', 'Chidinma', 'Bolanle', 'Amaka', 'Hadiza', 'Yetunde',
  'Chiamaka', 'Folasade', 'Kemi', 'Zainab', 'Ifeoma', 'Adaeze', 'Temitope',
  'Tunde', 'Emeka', 'Musa', 'Olumide', 'Chukwuemeka', 'Ibrahim', 'Segun',
  'Uche', 'Ikechukwu', 'Babatunde', 'Yusuf', 'Chinedu', 'Adewale', 'Obinna', 'Kabiru'
];

const LAST_NAMES = [
  'Adeyemi', 'Okafor', 'Mohammed', 'Balogun', 'Eze', 'Abubakar', 'Okonkwo',
  'Nwosu', 'Yusuf', 'Afolabi', 'Ibrahim', 'Chukwu', 'Olawale', 'Garba',
  'Nwachukwu', 'Adeleke', 'Suleiman', 'Onyekachi', 'Bello', 'Oyelaran'
];

const MOODS = {
  strict: {
    id: 'strict', label: 'Strict',
    desc: 'Notices everything. Good news and bad news both land harder.',
    goodwillMult: 1.3
  },
  fair: {
    id: 'fair', label: 'Fair',
    desc: 'Judges you by the numbers, nothing more.',
    goodwillMult: 1.0
  },
  volatile: {
    id: 'volatile', label: 'Volatile',
    desc: 'Great one day, impossible the next.',
    goodwillRange: [0.5, 1.7]
  },
  easygoing: {
    id: 'easygoing', label: 'Easygoing',
    desc: 'Lets most things slide.',
    goodwillMult: 0.75
  }
};

const MOOD_IDS = Object.keys(MOODS);

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateCharacter() {
  const name = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
  const moodId = pick(MOOD_IDS);
  return { name, moodId };
}

function moodOf(character) { return MOODS[character.moodId]; }

// Regional Director dialogue varies by mood and by the rating just delivered.
const RD_LINES = {
  strict: {
    A: '"Acceptable. Do not let it slip next month."',
    B: '"Fair is not excellent. Close the gap next month."',
    C: '"I expected more from this branch. Fix it."',
    D: '"This is a query letter situation. No excuses."'
  },
  fair: {
    A: '"Solid numbers. Keep this pace and you will go far."',
    B: '"Good effort. A little more and this is an A."',
    C: '"The numbers are weak, but I have seen worse. Improve."',
    D: '"We need to talk about your target. Seriously."'
  },
  volatile: {
    A: '"Finally! Why can\'t it always be like this?!"',
    B: '"Hmm. Not bad. Could be better. Could be much worse."',
    C: '"Is this a joke? ...Actually, fine, just fix it."',
    D: '"Unbelievable. Simply unbelievable. We will speak again."'
  },
  easygoing: {
    A: '"Nice one. Buy yourself something sha."',
    B: '"Not bad at all. Everybody\'s market is tough."',
    C: '"It happens. Just try and pick it up small small."',
    D: '"Ah ah. Well, next month is another month."'
  }
};
