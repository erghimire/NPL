import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const iconSvg = fs.readFileSync(path.join(publicDir, 'icon.svg'));

async function generateScreenshots() {
  const iconBuffer = await sharp(iconSvg).resize(360, 360).toBuffer();

  // 1. Mobile Screenshot (1080x1920)
  const mobileSvg = `
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
    <rect width="1080" height="1920" fill="#0b0f19" />
    <rect x="0" y="0" width="1080" height="180" fill="#0f172a" />
    <text x="540" y="110" font-family="sans-serif" font-weight="900" font-size="44" fill="#ffffff" text-anchor="middle">
      NEPAL PREMIER LEAGUE NPL
    </text>
    <rect x="60" y="240" width="960" height="420" rx="28" fill="#1e293b" stroke="#334155" stroke-width="4" />
    <text x="120" y="320" font-family="sans-serif" font-weight="bold" font-size="34" fill="#ef4444">🔴 MATCH IN PROGRESS • QUALIFIER 1</text>
    <text x="120" y="420" font-family="sans-serif" font-weight="900" font-size="52" fill="#ffffff">Janakpur Bolts</text>
    <text x="960" y="420" font-family="sans-serif" font-weight="900" font-size="64" fill="#f59e0b" text-anchor="end">174/4 (18.2)</text>
    <text x="120" y="520" font-family="sans-serif" font-weight="bold" font-size="40" fill="#94a3b8">Sudurpaschim Royals</text>
    <text x="960" y="520" font-family="sans-serif" font-weight="bold" font-size="48" fill="#cbd5e1" text-anchor="end">168/8 (20.0)</text>
    <rect x="100" y="580" width="880" height="50" rx="12" fill="#0f172a" />
    <text x="540" y="615" font-family="sans-serif" font-weight="bold" font-size="28" fill="#fbbf24" text-anchor="middle">Janakpur Bolts need 1 run in 10 balls to win</text>
    
    <!-- Points Table preview -->
    <rect x="60" y="700" width="960" height="850" rx="28" fill="#1e293b" stroke="#334155" stroke-width="4" />
    <text x="120" y="780" font-family="sans-serif" font-weight="bold" font-size="38" fill="#ffffff">🏆 POINTS TABLE STANDINGS</text>
    
    <rect x="100" y="830" width="880" height="100" rx="16" fill="#059669" fill-opacity="0.2" />
    <text x="140" y="895" font-family="sans-serif" font-weight="bold" font-size="32" fill="#34d399">1. Janakpur Bolts (Q1)</text>
    <text x="940" y="895" font-family="sans-serif" font-weight="bold" font-size="36" fill="#fbbf24" text-anchor="end">12 PTS (+1.285)</text>

    <rect x="100" y="950" width="880" height="100" rx="16" fill="#2563eb" fill-opacity="0.2" />
    <text x="140" y="1015" font-family="sans-serif" font-weight="bold" font-size="32" fill="#60a5fa">2. Sudurpaschim Royals (Q1)</text>
    <text x="940" y="1015" font-family="sans-serif" font-weight="bold" font-size="36" fill="#fbbf24" text-anchor="end">10 PTS (+0.842)</text>

    <rect x="100" y="1070" width="880" height="100" rx="16" fill="#334155" />
    <text x="140" y="1135" font-family="sans-serif" font-weight="bold" font-size="32" fill="#f87171">3. Biratnagar Kings</text>
    <text x="940" y="1135" font-family="sans-serif" font-weight="bold" font-size="36" fill="#fbbf24" text-anchor="end">8 PTS (+0.312)</text>

    <rect x="100" y="1190" width="880" height="100" rx="16" fill="#334155" />
    <text x="140" y="1255" font-family="sans-serif" font-weight="bold" font-size="32" fill="#4ade80">4. Kathmandu Gurkhas</text>
    <text x="940" y="1255" font-family="sans-serif" font-weight="bold" font-size="36" fill="#fbbf24" text-anchor="end">8 PTS (+0.118)</text>

    <!-- Bottom Navigation Bar -->
    <rect x="0" y="1740" width="1080" height="180" fill="#0f172a" />
    <text x="540" y="1840" font-family="sans-serif" font-weight="bold" font-size="36" fill="#f59e0b" text-anchor="middle">
      🏏 Live • 🏆 Table • 📅 Fixtures • 🛡️ Teams
    </text>
  </svg>
  `;

  await sharp(Buffer.from(mobileSvg))
    .png()
    .toFile(path.join(publicDir, 'screenshot-mobile.png'));
  console.log('Generated screenshot-mobile.png');

  // 2. Desktop Screenshot (1920x1080)
  const desktopSvg = `
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <rect width="1920" height="1080" fill="#0b0f19" />
    <rect x="0" y="0" width="1920" height="90" fill="#0f172a" />
    <text x="960" y="60" font-family="sans-serif" font-weight="900" font-size="36" fill="#ffffff" text-anchor="middle">
      NEPAL PREMIER LEAGUE (NPL) - OFFICIAL LIVE SCORES &amp; POINTS TABLE
    </text>

    <!-- Scorecard Card Left -->
    <rect x="80" y="140" width="840" height="840" rx="24" fill="#1e293b" stroke="#334155" stroke-width="4" />
    <text x="130" y="220" font-family="sans-serif" font-weight="bold" font-size="28" fill="#ef4444">🔴 LIVE MATCH • TRIBHUVAN UNIVERSITY GROUND</text>
    <text x="130" y="320" font-family="sans-serif" font-weight="900" font-size="46" fill="#ffffff">Janakpur Bolts</text>
    <text x="860" y="320" font-family="sans-serif" font-weight="900" font-size="54" fill="#f59e0b" text-anchor="end">174/4 (18.2 ov)</text>
    <text x="130" y="420" font-family="sans-serif" font-weight="bold" font-size="36" fill="#94a3b8">Sudurpaschim Royals</text>
    <text x="860" y="420" font-family="sans-serif" font-weight="bold" font-size="42" fill="#cbd5e1" text-anchor="end">168/8 (20.0 ov)</text>

    <!-- Table Card Right -->
    <rect x="1000" y="140" width="840" height="840" rx="24" fill="#1e293b" stroke="#334155" stroke-width="4" />
    <text x="1050" y="220" font-family="sans-serif" font-weight="bold" font-size="32" fill="#ffffff">🏆 POINTS TABLE (NET RUN RATE)</text>
    <text x="1050" y="310" font-family="sans-serif" font-weight="bold" font-size="26" fill="#34d399">1. Janakpur Bolts (Q1) — 12 Pts (+1.285 NRR)</text>
    <text x="1050" y="390" font-family="sans-serif" font-weight="bold" font-size="26" fill="#60a5fa">2. Sudurpaschim Royals (Q1) — 10 Pts (+0.842 NRR)</text>
    <text x="1050" y="470" font-family="sans-serif" font-weight="bold" font-size="26" fill="#f87171">3. Biratnagar Kings (Eliminator) — 8 Pts (+0.312 NRR)</text>
    <text x="1050" y="550" font-family="sans-serif" font-weight="bold" font-size="26" fill="#4ade80">4. Kathmandu Gurkhas (Eliminator) — 8 Pts (+0.118 NRR)</text>
  </svg>
  `;

  await sharp(Buffer.from(desktopSvg))
    .png()
    .toFile(path.join(publicDir, 'screenshot-desktop.png'));
  console.log('Generated screenshot-desktop.png');
}

generateScreenshots().catch(console.error);
