// Core game engine: state, the weekly task loop, MPR scoring, promotions,
// lose/win conditions, and local save. No rendering here — see ui.js.

const GRADES = [
  'Executive Trainee',
  'Banking Officer',
  'Senior Banking Officer',
  'Assistant Manager',
  'Deputy Manager',
  'Manager',
  'Assistant General Manager'
];

const SAVE_KEY = 'banka_save_v1';
const SLOTS = ['Morning', 'Afternoon', 'Evening'];

const Game = {
  state: null,

  newCareer(bankId, deskId) {
    const bank = BANKS.find(b => b.id === bankId);
    const desk = DESKS.find(d => d.id === deskId);
    this.state = {
      bankId, deskId,
      gradeIndex: 1, // start as Banking Officer
      monthNumber: 1,
      week: 1,
      slotIndex: 0,
      targetRequired: Math.round(desk.baseTarget * bank.targetMult),
      stats: {
        targetProgress: 0,
        stress: 20,
        goodwill: 55,
        compliance: bank.startCompliance,
        balance: 150000
      },
      promotionPoints: 0,
      consecutiveD: 0,
      ratingHistory: [],
      log: [],
      usedEventIds: [],
      over: false,
      outcome: null // 'victory' | 'sacked' | 'burnout' | 'suspended' | 'resigned'
    };
    this.addLog(`You resume as a ${GRADES[1]} at ${bank.name} (${desk.name} desk).`);
    this.save();
    return this.state;
  },

  bank() { return BANKS.find(b => b.id === this.state.bankId); },
  desk() { return DESKS.find(d => d.id === this.state.deskId); },
  grade() { return GRADES[this.state.gradeIndex]; },
  currentSlot() { return SLOTS[this.state.slotIndex]; },

  addLog(line) {
    this.state.log.unshift(line);
    if (this.state.log.length > 60) this.state.log.pop();
  },

  clamp(v, min, max) { return Math.max(min, Math.min(max, v)); },

  applyEffects(effects) {
    const s = this.state.stats;
    if (!effects) return;
    if (effects.targetProgress) s.targetProgress = Math.max(0, s.targetProgress + effects.targetProgress);
    if (effects.stress) s.stress = this.clamp(s.stress + effects.stress, 0, 100);
    if (effects.goodwill) s.goodwill = this.clamp(s.goodwill + effects.goodwill, 0, 100);
    if (effects.compliance) s.compliance = this.clamp(s.compliance + effects.compliance, 0, 100);
    if (effects.balance) s.balance += effects.balance;
    this.checkLoseConditions();
  },

  // Returns true if a task was taken and a slot consumed.
  doTask(taskId) {
    if (this.state.over || this.weekComplete()) return false;
    const desk = this.desk();
    const task = taskId === 'rest' ? REST_TASK : desk.tasks.find(t => t.id === taskId);
    if (!task) return false;
    this.applyEffects(task.effects);
    this.addLog(`${this.currentSlot()}: ${task.name}.`);
    this.state.slotIndex++;
    this.save();
    return true;
  },

  weekComplete() { return this.state.slotIndex >= SLOTS.length; },

  // Picks a random event the player hasn't seen this career yet (resets pool once exhausted).
  drawEvent() {
    let pool = EVENTS.filter(e => !this.state.usedEventIds.includes(e.id));
    if (pool.length === 0) {
      this.state.usedEventIds = [];
      pool = EVENTS;
    }
    const event = pool[Math.floor(Math.random() * pool.length)];
    this.state.usedEventIds.push(event.id);
    return event;
  },

  resolveEvent(event, choiceIndex) {
    const choice = event.choices[choiceIndex];
    this.applyEffects(choice.effects);
    this.addLog(`${event.title} → ${choice.label}.`);
    if (choice.endGame) {
      this.state.over = true;
      this.state.outcome = choice.endGame;
    }
    // Ambient bank pressure lands at the end of each week.
    this.applyEffects({ stress: this.bank().weeklyStress });
    this.state.week++;
    this.state.slotIndex = 0;
    this.save();
  },

  monthComplete() { return this.state.week > 4; },

  checkLoseConditions() {
    const s = this.state.stats;
    if (this.state.over) return;
    if (s.stress >= 100) { this.state.over = true; this.state.outcome = 'burnout'; }
    else if (s.goodwill <= 0) { this.state.over = true; this.state.outcome = 'sacked'; }
    else if (s.compliance <= 0) { this.state.over = true; this.state.outcome = 'suspended'; }
  },

  rateMonth() {
    const s = this.state.stats;
    const targetPct = this.clamp((s.targetProgress / this.state.targetRequired) * 100, 0, 150);
    const composite = targetPct * 0.5 + s.compliance * 0.25 + s.goodwill * 0.25;
    let rating;
    if (composite >= 85) rating = 'A';
    else if (composite >= 65) rating = 'B';
    else if (composite >= 45) rating = 'C';
    else rating = 'D';
    return { rating, composite: Math.round(composite), targetPct: Math.round(targetPct) };
  },

  runMPR() {
    const result = this.rateMonth();
    const points = { A: 2, B: 1, C: 0, D: 0 }[result.rating];
    this.state.promotionPoints += points;
    this.state.ratingHistory.unshift({ month: this.state.monthNumber, rating: result.rating });

    if (result.rating === 'D') {
      this.state.consecutiveD++;
      this.applyEffects({ goodwill: -10 });
    } else {
      this.state.consecutiveD = 0;
    }

    let promoted = false;
    let victory = false;
    if (!this.state.over && this.state.consecutiveD >= 2) {
      this.state.over = true;
      this.state.outcome = 'sacked';
    } else if (!this.state.over && this.state.promotionPoints >= 4) {
      this.state.promotionPoints -= 4;
      if (this.state.gradeIndex < GRADES.length - 1) {
        this.state.gradeIndex++;
        promoted = true;
        this.addLog(`Promoted to ${this.grade()}.`);
        if (this.state.gradeIndex === GRADES.length - 1) {
          this.state.over = true;
          this.state.outcome = 'victory';
          victory = true;
        }
      }
    }

    // Salary lands, target resets and climbs for the new month.
    const salary = Math.round(60000 * this.bank().payMult * (1 + 0.15 * this.state.gradeIndex));
    this.applyEffects({ balance: salary });
    this.state.targetRequired = Math.round(this.state.targetRequired * 1.1);
    this.state.stats.targetProgress = 0;
    this.state.stats.stress = this.clamp(this.state.stats.stress - 15, 0, 100);
    this.state.monthNumber++;
    this.state.week = 1;
    this.state.slotIndex = 0;

    this.addLog(`MPR result: ${result.rating} rating (score ${result.composite}).`);
    this.save();
    return { ...result, promoted, victory };
  },

  save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.state)); } catch (e) { /* ignore */ }
  },

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      this.state = JSON.parse(raw);
      return true;
    } catch (e) { return false; }
  },

  clearSave() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
  }
};
