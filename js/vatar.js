// Optional Lagos Life (Vatar Games SDK) integration. BanKa must keep working
// identically when opened standalone (e.g. the GitHub Pages link) — every call
// here is guarded so a missing SDK or a non-framed context just no-ops.

const VatarIntegration = {
  active: false,
  player: null,

  async init() {
    if (typeof window.Vatar === 'undefined') return { active: false, player: null };
    try {
      const { player } = await window.Vatar.init();
      this.active = true;
      this.player = player;
      return { active: true, player };
    } catch (e) {
      // Most commonly not_framed: the page was opened outside the Lagos Life
      // game player (e.g. the standalone GitHub Pages link). That's expected.
      this.active = false;
      return { active: false, player: null };
    }
  },

  // BanKa's score is the player's account balance in naira, per the design
  // plan ("Account balance: shown on the end screen as a score").
  submitScore(balance) {
    if (!this.active) return;
    window.Vatar.submitScore(Math.max(0, Math.round(balance))).catch(() => {});
  }
};
