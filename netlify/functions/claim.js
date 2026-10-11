// Verifies and delivers a Vatar Games purchase. This is the only place in
// BanKa's stack that touches VATAR_SECRET -- it must stay a server-side
// environment variable in Netlify's site settings, never in client code.
//
// Flow, per the Vatar Games SDK docs: the client calls Vatar.purchase(), then
// asks this endpoint to confirm it. We check the purchase really happened and
// belongs to the asking player, then mark it delivered. A purchase is only
// ever real once OUR server (not the client) says so.

const API = 'https://lagoslife.app/api/games/v1';
const SECRET = process.env.VATAR_SECRET;
const PRODUCT_ID = 'supporter_badge';

async function api(path, body) {
  const r = await fetch(API + path, {
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    headers: { Authorization: `Bearer ${SECRET}`, 'Content-Type': 'application/json' }
  });
  return { http: r.status, ...(await r.json()) };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 404, body: 'Not found' };
  }
  if (!SECRET) {
    return { statusCode: 500, body: 'VATAR_SECRET is not configured' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: 'Bad request' };
  }
  const { session, purchaseId } = payload;
  if (!session || !purchaseId) {
    return { statusCode: 400, body: 'Bad request' };
  }

  const me = await api('/session/verify', { session });
  const p = await api(`/purchases/${encodeURIComponent(purchaseId)}`);

  if (me.http !== 200 || p.http !== 200 || p.playerId !== me.playerId) {
    return { statusCode: 403, body: 'Forbidden' };
  }
  if (p.productId !== PRODUCT_ID) {
    return { statusCode: 400, body: 'Unknown product' };
  }
  if (p.status === 'refunded') {
    return { statusCode: 409, body: 'Refunded' };
  }

  // The Supporter Badge is a cosmetic flag only -- nothing to credit in a
  // database, so confirming + delivering with Vatar is the whole job.
  await api(`/purchases/${p.id}/deliver`, {});

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, productId: p.productId })
  };
};
