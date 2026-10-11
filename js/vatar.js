// Optional Lagos Life (Vatar Games SDK) integration. BanKa must keep working
// identically when opened standalone (e.g. the GitHub Pages link) — every call
// here is guarded so a missing SDK or a non-framed context just no-ops.

const SUPPORTER_PRODUCT_ID = 'supporter_badge';

const VatarIntegration = {
  active: false,
  player: null,
  hasSupporterBadge: false,
  _pauseCbs: [],
  _resumeCbs: [],
  _supporterCbs: [],

  async init() {
    if (typeof window.Vatar === 'undefined') return { active: false, player: null };
    try {
      const { player } = await window.Vatar.init();
      this.active = true;
      this.player = player;
      // The phone backgrounded, or the pay sheet opened over us: stop sound
      // and block input until resume.
      window.Vatar.onPause(() => this._pauseCbs.forEach(fn => fn()));
      window.Vatar.onResume(() => this._resumeCbs.forEach(fn => fn()));
      // Paid earlier but not yet delivered (e.g. a crash mid-purchase), and
      // purchases confirmed while the game was away.
      window.Vatar.onPurchase((p) => this._claim(p));
      window.Vatar.purchases().then((list) => list.forEach((p) => this._claim(p))).catch(() => {});
      return { active: true, player };
    } catch (e) {
      // Most commonly not_framed: the page was opened outside the Lagos Life
      // game player (e.g. the standalone GitHub Pages link). That's expected.
      this.active = false;
      return { active: false, player: null };
    }
  },

  onPause(fn) { this._pauseCbs.push(fn); },
  onResume(fn) { this._resumeCbs.push(fn); },
  onSupporterBadge(fn) { this._supporterCbs.push(fn); },

  // Our own server checks the purchase with Vatar's API and marks it
  // delivered -- the client never just trusts "paid" on its own.
  async _claim(purchase) {
    if (purchase.productId !== SUPPORTER_PRODUCT_ID) return;
    try {
      const { session } = await window.Vatar.session();
      const r = await fetch('/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session, purchaseId: purchase.purchaseId })
      });
      if (r.ok) {
        this.hasSupporterBadge = true;
        this._supporterCbs.forEach(fn => fn());
      }
    } catch (e) { /* network hiccup; purchases() will retry on next load */ }
  },

  // Opens Lagos Life's own pay sheet for the ₦100 cosmetic Supporter Badge.
  async buySupporterBadge() {
    if (!this.active || this.hasSupporterBadge) return { ok: false };
    try {
      const purchase = await window.Vatar.purchase(SUPPORTER_PRODUCT_ID);
      await this._claim(purchase);
      return { ok: true };
    } catch (e) {
      return { ok: false, code: e.code };
    }
  },

  // BanKa's score is the player's account balance in naira, per the design
  // plan ("Account balance: shown on the end screen as a score").
  submitScore(balance) {
    if (!this.active) return;
    window.Vatar.submitScore(Math.max(0, Math.round(balance))).catch(() => {});
  }
};
