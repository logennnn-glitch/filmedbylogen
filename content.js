const jwt = require('jsonwebtoken');

// Default content if none saved yet
const DEFAULT_CONTENT = {
  hero: {
    eyebrow: "Photography & Videography — Kuala Lumpur",
    title: "Stills that",
    titleItalic: "hold time.",
    sub: "Pre-wedding · Couple · Portrait · Baby · Fashion"
  },
  about: {
    heading: "Quiet moments,",
    headingItalic: "deliberate frames.",
    bio1: "I'm Logen — a photographer and filmmaker based in Malaysia. I work in the space between candid and composed, where the image feels lived-in rather than performed.",
    bio2: "Every project I take on is flexible, unhurried, and personal. No live events — just sessions we can shape together, on our own time."
  },
  contact: {
    heading: "Let's make",
    headingItalic: "something.",
    desc: "All sessions are flexible — no locked dates until we agree on a plan. Tell me what you have in mind and I'll get back to you within 48 hours."
  },
  footer: {
    instagram: "https://instagram.com/filmedbylogen",
    handle: "@filmedbylogen"
  },
  portfolio: [
    { id: 1, category: "pre-wedding", title: "Forest Session", url: "", cloudinaryId: "" },
    { id: 2, category: "couple", title: "Golden Hour", url: "", cloudinaryId: "" },
    { id: 3, category: "portrait", title: "Studio Portrait", url: "", cloudinaryId: "" },
    { id: 4, category: "baby", title: "Newborn Session", url: "", cloudinaryId: "" },
    { id: 5, category: "fashion", title: "Editorial", url: "", cloudinaryId: "" },
    { id: 6, category: "pre-wedding", title: "Rooftop Dusk", url: "", cloudinaryId: "" },
    { id: 7, category: "portrait", title: "Natural Light", url: "", cloudinaryId: "" }
  ]
};

// In-memory store (persists per serverless instance, good enough for low traffic)
// For production persistence, swap this with a DB like PlanetScale or Upstash
let storedContent = null;

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return false;
  try {
    jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET — public, returns current content
  if (req.method === 'GET') {
    return res.status(200).json(storedContent || DEFAULT_CONTENT);
  }

  // POST — protected, saves new content
  if (req.method === 'POST') {
    if (!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });
    storedContent = { ...DEFAULT_CONTENT, ...req.body };
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
