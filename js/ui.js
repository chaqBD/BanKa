// DOM rendering and event wiring. Game.js owns all state; this file only reads
// it and reacts to clicks.

const UI = {
  selectedBankId: null,

  init() {
    this.cacheEls();
    this.bindStaticEvents();
    this.updateMuteIcon();
    if (Game.load() && !Game.state.over) {
      this.els.btnContinue.hidden = false;
    }
    this.showScreen('screen-intro');
  },

  cacheEls() {
    this.els = {
      screens: document.querySelectorAll('.screen'),
      btnStart: document.getElementById('btn-start'),
      btnContinue: document.getElementById('btn-continue'),
      bankTiers: document.getElementById('bank-tiers'),
      btnConfirmSetup: document.getElementById('btn-confirm-setup'),
      hudGrade: document.getElementById('hud-grade'),
      hudBankDesk: document.getElementById('hud-bank-desk'),
      hudMonthWeek: document.getElementById('hud-month-week'),
      hudOffice: document.getElementById('hud-office'),
      hudStats: document.getElementById('hud-stats'),
      hudTargetText: document.getElementById('hud-target-text'),
      hudTargetBar: document.getElementById('hud-target-bar'),
      slotHeading: document.getElementById('slot-heading'),
      deskBlurb: document.getElementById('desk-blurb'),
      taskList: document.getElementById('task-list'),
      logList: document.getElementById('log-list'),
      modalEvent: document.getElementById('modal-event'),
      eventCategory: document.getElementById('event-category'),
      eventTitle: document.getElementById('event-title'),
      eventDesc: document.getElementById('event-desc'),
      eventChoices: document.getElementById('event-choices'),
      modalMpr: document.getElementById('modal-mpr'),
      mprRatingLetter: document.getElementById('mpr-rating-letter'),
      mprLine: document.getElementById('mpr-line'),
      mprDetail: document.getElementById('mpr-detail'),
      btnMprContinue: document.getElementById('btn-mpr-continue'),
      endTitle: document.getElementById('end-title'),
      endMessage: document.getElementById('end-message'),
      endStats: document.getElementById('end-stats'),
      btnRestart: document.getElementById('btn-restart'),
      btnMute: document.getElementById('btn-mute')
    };
  },

  bindStaticEvents() {
    this.els.btnStart.addEventListener('click', () => this.startSetup());
    this.els.btnContinue.addEventListener('click', () => this.resumeGame());
    this.els.btnConfirmSetup.addEventListener('click', () => this.confirmSetup());
    this.els.btnMprContinue.addEventListener('click', () => this.dismissMpr());
    this.els.btnRestart.addEventListener('click', () => this.restart());
    this.els.btnMute.addEventListener('click', () => {
      SoundFX.toggleMute();
      this.updateMuteIcon();
    });
  },

  updateMuteIcon() {
    this.els.btnMute.textContent = SoundFX.muted ? '🔇' : '🔊';
  },

  showScreen(id) {
    this.els.screens.forEach(s => s.classList.toggle('active', s.id === id));
  },

  // ---------- Setup ----------
  startSetup() {
    this.selectedBankId = null;
    this.renderBankTiers();
    this.els.btnConfirmSetup.disabled = true;
    this.showScreen('screen-setup');
  },

  renderBankTiers() {
    const tiers = {};
    BANKS.forEach(b => { (tiers[b.tier] = tiers[b.tier] || []).push(b); });
    this.els.bankTiers.innerHTML = '';
    Object.keys(tiers).forEach(tierName => {
      const group = document.createElement('div');
      group.className = 'bank-tier-group';
      const h = document.createElement('h3');
      h.textContent = tierName;
      group.appendChild(h);
      const row = document.createElement('div');
      row.className = 'bank-row';
      tiers[tierName].forEach(bank => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'bank-chip';
        chip.dataset.bankId = bank.id;
        chip.innerHTML = `<span class="bank-name">${bank.name}</span>
          <span class="bank-meta">${bank.cities[0]} · difficulty ${'●'.repeat(bank.difficulty)}${'○'.repeat(5 - bank.difficulty)}</span>`;
        chip.addEventListener('click', () => {
          this.selectedBankId = bank.id;
          this.els.bankTiers.querySelectorAll('.bank-chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          this.updateConfirmState();
        });
        row.appendChild(chip);
      });
      group.appendChild(row);
      this.els.bankTiers.appendChild(group);
    });
  },

  updateConfirmState() {
    this.els.btnConfirmSetup.disabled = !this.selectedBankId;
  },

  confirmSetup() {
    Game.newCareer(this.selectedBankId);
    this.renderGameScreen();
    this.showScreen('screen-game');
  },

  resumeGame() {
    this.showScreen('screen-game');
    if (Game.weekComplete()) {
      // A save landed mid-event (e.g. tab closed before a choice was made); resolve it now.
      this.renderGameScreen();
      this.showEventModal();
    } else {
      this.renderGameScreen();
    }
  },

  restart() {
    Game.clearSave();
    this.els.btnContinue.hidden = true;
    this.showScreen('screen-intro');
  },

  // ---------- Main game screen ----------
  statDefs: [
    { key: 'stress', label: 'Stress', max: 100, goodHigh: false },
    { key: 'goodwill', label: 'Boss goodwill', max: 100, goodHigh: true },
    { key: 'compliance', label: 'Compliance', max: 100, goodHigh: true }
  ],

  renderGameScreen() {
    const s = Game.state;
    const bank = Game.bank();
    const desk = Game.desk();

    this.els.hudGrade.textContent = Game.grade();
    this.els.hudBankDesk.textContent = `${bank.name} · ${desk.name}`;
    this.els.hudMonthWeek.textContent = `Month ${s.monthNumber} · Week ${s.week} of 4`;

    const bmMood = moodOf(s.bm);
    if (desk.id === 'bm') {
      this.els.hudOffice.innerHTML = `<div class="office-row"><strong>You</strong> are the Branch Manager now. Regional Director ${s.regionalDirector.name} watches your numbers directly.</div>`;
    } else {
      this.els.hudOffice.innerHTML = `<div class="office-row"><strong>${s.bm.name}</strong> — your Branch Manager <span class="mood-tag mood-${bmMood.id}">${bmMood.label}</span></div>`;
    }

    this.els.hudStats.innerHTML = '';
    this.statDefs.forEach(def => {
      const val = s.stats[def.key];
      const pct = Math.round((val / def.max) * 100);
      const level = this.levelFor(def, val);
      const box = document.createElement('div');
      box.className = `stat-box stat-${level}`;
      box.innerHTML = `<div class="stat-label">${def.label}</div>
        <div class="stat-value">${val}</div>
        <div class="bar-track small"><div class="bar-fill ${level}" style="width:${pct}%"></div></div>`;
      this.els.hudStats.appendChild(box);
    });
    const balBox = document.createElement('div');
    balBox.className = 'stat-box stat-neutral';
    balBox.innerHTML = `<div class="stat-label">Account balance</div>
      <div class="stat-value">₦${s.stats.balance.toLocaleString()}</div>`;
    this.els.hudStats.appendChild(balBox);

    const targetPct = Math.min(100, Math.round((s.stats.targetProgress / s.targetRequired) * 100));
    this.els.hudTargetText.textContent = `${s.stats.targetProgress} / ${s.targetRequired} ${desk.targetUnit} (${targetPct}%)`;
    this.els.hudTargetBar.style.width = `${targetPct}%`;

    this.els.slotHeading.textContent = `${Game.currentSlot()} — pick a task`;
    this.els.deskBlurb.textContent = desk.blurb;

    this.els.taskList.innerHTML = '';
    desk.tasks.concat([REST_TASK]).forEach(task => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = task.id === 'rest' ? 'task-card task-rest' : 'task-card';
      btn.innerHTML = `<div class="task-name">${task.name}</div>
        <div class="task-flavor">${task.flavor}</div>
        <div class="task-effects">${this.effectsSummary(task.effects)}</div>`;
      btn.addEventListener('click', () => this.pickTask(task.id));
      this.els.taskList.appendChild(btn);
    });

    this.els.logList.innerHTML = '';
    s.log.slice(0, 12).forEach(line => {
      const li = document.createElement('li');
      li.textContent = line;
      this.els.logList.appendChild(li);
    });
  },

  levelFor(def, val) {
    const bad = def.goodHigh ? val < 35 : val > 65;
    const warn = def.goodHigh ? val < 60 : val > 40;
    if (bad) return 'bad';
    if (warn) return 'warn';
    return 'good';
  },

  effectsSummary(effects) {
    if (!effects) return '';
    const names = { targetProgress: 'target', stress: 'stress', goodwill: 'goodwill', compliance: 'compliance', balance: '₦' };
    return Object.keys(effects).map(k => {
      const v = effects[k];
      const sign = v > 0 ? '+' : '';
      return `${names[k]} ${sign}${v}`;
    }).join(' · ');
  },

  pickTask(taskId) {
    SoundFX.playClick();
    Game.doTask(taskId);
    if (Game.state.over) { this.showEnd(); return; }
    if (Game.weekComplete()) {
      this.showEventModal();
    } else {
      this.renderGameScreen();
    }
  },

  // ---------- Event modal ----------
  showEventModal() {
    const event = Game.drawEvent();
    this._currentEvent = event;
    this.els.eventCategory.textContent = event.category;
    this.els.eventTitle.textContent = event.title;
    this.els.eventDesc.textContent = event.desc;
    this.els.eventChoices.innerHTML = '';
    event.choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.innerHTML = `<div class="choice-label">${choice.label}</div>
        <div class="choice-effects">${this.effectsSummary(choice.effects)}</div>`;
      btn.addEventListener('click', () => this.resolveEventChoice(idx));
      this.els.eventChoices.appendChild(btn);
    });
    this.els.modalEvent.hidden = false;
  },

  resolveEventChoice(idx) {
    SoundFX.playClick();
    Game.resolveEvent(this._currentEvent, idx);
    this.els.modalEvent.hidden = true;
    if (Game.state.over) { this.showEnd(); return; }
    if (Game.monthComplete()) {
      this.showMprModal();
    } else {
      this.renderGameScreen();
    }
  },

  // ---------- MPR modal ----------
  showMprModal() {
    const result = Game.runMPR();
    const rd = Game.state.regionalDirector;
    this.els.mprRatingLetter.textContent = result.rating;
    this.els.mprRatingLetter.className = `mpr-rating mpr-${result.rating}`;
    // Force the stamp animation to replay even if the previous rating was the same letter.
    void this.els.mprRatingLetter.offsetWidth;
    this.els.mprRatingLetter.classList.add('stamp-pop');

    const line = RD_LINES[rd.moodId][result.rating];
    this.els.mprLine.textContent = `${line} — ${rd.name}, Regional Director`;

    this.els.mprDetail.innerHTML = '';
    const details = [
      `Target achieved: ${result.targetPct}%`,
      `Composite score: ${result.composite}/100`,
      result.deskChanged ? `You now work the ${Game.desk().name} desk.` : null,
      result.promoted ? `Promoted to ${Game.grade()}!` : null,
      result.victory ? 'You have reached Assistant General Manager.' : null
    ].filter(Boolean);
    details.forEach(d => {
      const li = document.createElement('li');
      li.textContent = d;
      this.els.mprDetail.appendChild(li);
    });
    this.els.modalMpr.hidden = false;

    SoundFX.playStamp();
    setTimeout(() => SoundFX.playRating(result.rating), 180);
    if (result.promoted) setTimeout(() => SoundFX.playPromotion(), 500);
  },

  dismissMpr() {
    this.els.modalMpr.hidden = true;
    if (Game.state.over) { this.showEnd(); return; }
    this.renderGameScreen();
  },

  // ---------- End screen ----------
  endCopy: {
    victory: {
      title: 'From banking hall to boardroom',
      message: 'You made it to Assistant General Manager. There is a Prado waiting in the car park and a new regional target on your desk. The cycle continues, but today, you won.'
    },
    sacked: {
      title: 'Your services are no longer required',
      message: 'HR calls you in. Boss goodwill ran out, or two D ratings in a row sealed it. The letter is already printed.'
    },
    burnout: {
      title: 'Japa',
      message: 'Stress hit 100. You hand in your resignation and book a one-way ticket. Some targets are not worth your health.'
    },
    suspended: {
      title: 'Suspended pending investigation',
      message: 'Compliance hit zero. Internal Control has opened a file with your name on it. You are asked to proceed on suspension.'
    },
    resigned: {
      title: 'Greener pastures',
      message: 'You took the headhunter\'s offer and resigned. A new bank, a new target, a new story — just not this one.'
    }
  },

  showEnd() {
    const copy = this.endCopy[Game.state.outcome] || this.endCopy.sacked;
    this.els.endTitle.textContent = copy.title;
    this.els.endMessage.textContent = copy.message;
    const s = Game.state;
    this.els.endStats.innerHTML = '';
    const rows = [
      ['Final grade', Game.grade()],
      ['Bank', Game.bank().name],
      ['Desk', Game.desk().name],
      ['Reached month', s.monthNumber],
      ['Account balance', `₦${s.stats.balance.toLocaleString()}`]
    ];
    rows.forEach(([label, val]) => {
      const row = document.createElement('div');
      row.className = 'end-stat-row';
      row.innerHTML = `<span>${label}</span><strong>${val}</strong>`;
      this.els.endStats.appendChild(row);
    });
    Game.clearSave();
    this.els.btnContinue.hidden = true;
    this.showScreen('screen-end');
  }
};

document.addEventListener('DOMContentLoaded', () => UI.init());
