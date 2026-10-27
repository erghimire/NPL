import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const teamsDir = path.resolve('public/assets/teams');
const bannersDir = path.join(teamsDir, 'banners');

if (!fs.existsSync(bannersDir)) {
  fs.mkdirSync(bannersDir, { recursive: true });
}

const CRESTS = [
  {
    id: 'sudurpaschim_royals',
    file: 'sudurpaschim-royals.png',
    svg: `
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="srGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e3a8a" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24" />
            <stop offset="50%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="185" fill="url(#srGrad)" stroke="url(#gold)" stroke-width="8" />
        <path d="M120 250 L140 150 L175 190 L200 130 L225 190 L260 150 L280 250 Z" fill="url(#gold)" />
        <circle cx="140" cy="140" r="10" fill="#ffffff" />
        <circle cx="200" cy="120" r="12" fill="#ffffff" />
        <circle cx="260" cy="140" r="10" fill="#ffffff" />
        <text x="200" y="300" font-family="sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle" letter-spacing="2">
          SUDURPASCHIM
        </text>
        <text x="200" y="332" font-family="sans-serif" font-weight="900" font-size="22" fill="#f59e0b" text-anchor="middle" letter-spacing="4">
          ROYALS
        </text>
      </svg>
    `
  },
  {
    id: 'kathmandu_gurkhas',
    file: 'kathmandu-gurkhas.png',
    svg: `
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#064e3b" />
            <stop offset="100%" stop-color="#022c22" />
          </linearGradient>
          <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f1f5f9" />
            <stop offset="100%" stop-color="#94a3b8" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="185" fill="url(#kgGrad)" stroke="#10b981" stroke-width="8" />
        <!-- Crossed Khukuris -->
        <g stroke="url(#silver)" stroke-width="12" stroke-linecap="round">
          <path d="M120 120 Q200 200 280 280" />
          <path d="M280 120 Q200 200 120 280" />
        </g>
        <circle cx="200" cy="200" r="28" fill="#d97706" stroke="#ffffff" stroke-width="4" />
        <text x="200" y="315" font-family="sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle" letter-spacing="2">
          KATHMANDU
        </text>
        <text x="200" y="345" font-family="sans-serif" font-weight="900" font-size="22" fill="#34d399" text-anchor="middle" letter-spacing="4">
          GURKHAS
        </text>
      </svg>
    `
  },
  {
    id: 'pokhara_avengers',
    file: 'pokhara-avengers.png',
    svg: `
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="paGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#083344" />
            <stop offset="100%" stop-color="#02131d" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="185" fill="url(#paGrad)" stroke="#06b6d4" stroke-width="8" />
        <!-- Annapurna Peak & Eagle -->
        <polygon points="200,100 130,220 270,220" fill="#22d3ee" fill-opacity="0.3" />
        <polygon points="200,120 150,220 250,220" fill="#06b6d4" />
        <polygon points="200,120 185,150 200,145 215,150" fill="#ffffff" />
        <!-- Wings -->
        <path d="M110 180 Q200 160 290 180 Q200 220 110 180 Z" fill="#0ea5e9" />
        <text x="200" y="305" font-family="sans-serif" font-weight="900" font-size="30" fill="#ffffff" text-anchor="middle" letter-spacing="2">
          POKHARA
        </text>
        <text x="200" y="338" font-family="sans-serif" font-weight="900" font-size="22" fill="#22d3ee" text-anchor="middle" letter-spacing="4">
          AVENGERS
        </text>
      </svg>
    `
  },
  {
    id: 'chitwan_rhinos',
    file: 'chitwan-rhinos.png',
    svg: `
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="crGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#115e59" />
            <stop offset="100%" stop-color="#042f2e" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="185" fill="url(#crGrad)" stroke="#f97316" stroke-width="8" />
        <!-- Rhino Horn & Head Silhouette -->
        <path d="M140 230 Q170 170 230 170 Q270 180 280 230 Q230 250 140 230 Z" fill="#2dd4bf" />
        <path d="M230 170 L260 110 L245 175 Z" fill="#f97316" stroke="#ffffff" stroke-width="2" />
        <circle cx="210" cy="195" r="8" fill="#ffffff" />
        <text x="200" y="310" font-family="sans-serif" font-weight="900" font-size="30" fill="#ffffff" text-anchor="middle" letter-spacing="2">
          CHITWAN
        </text>
        <text x="200" y="342" font-family="sans-serif" font-weight="900" font-size="22" fill="#fb923c" text-anchor="middle" letter-spacing="4">
          RHINOS
        </text>
      </svg>
    `
  },
  {
    id: 'karnali_yaks',
    file: 'karnali-yaks.png',
    svg: `
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#581c87" />
            <stop offset="100%" stop-color="#2e1065" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="185" fill="url(#kyGrad)" stroke="#c084fc" stroke-width="8" />
        <!-- Yak Horns & Head -->
        <path d="M120 130 Q140 180 180 190 L220 190 Q260 180 280 130 Q240 150 200 170 Q160 150 120 130 Z" fill="#e9d5ff" />
        <path d="M160 185 L200 240 L240 185 Z" fill="#9333ea" stroke="#ffffff" stroke-width="3" />
        <text x="200" y="310" font-family="sans-serif" font-weight="900" font-size="30" fill="#ffffff" text-anchor="middle" letter-spacing="2">
          KARNALI
        </text>
        <text x="200" y="342" font-family="sans-serif" font-weight="900" font-size="24" fill="#c084fc" text-anchor="middle" letter-spacing="4">
          YAKS
        </text>
      </svg>
    `
  },
  {
    id: 'lumbini_lions',
    file: 'lumbini-lions.png',
    svg: `
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="llGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7f1d1d" />
            <stop offset="100%" stop-color="#450a0a" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="185" fill="url(#llGrad)" stroke="#f59e0b" stroke-width="8" />
        <!-- Roaring Lion Emblem -->
        <circle cx="200" cy="180" r="55" fill="#f59e0b" />
        <path d="M150 150 Q200 120 250 150 Q230 180 250 210 Q200 240 150 210 Q170 180 150 150 Z" fill="#b45309" />
        <circle cx="185" cy="170" r="6" fill="#ffffff" />
        <circle cx="215" cy="170" r="6" fill="#ffffff" />
        <text x="200" y="310" font-family="sans-serif" font-weight="900" font-size="30" fill="#ffffff" text-anchor="middle" letter-spacing="2">
          LUMBINI
        </text>
        <text x="200" y="342" font-family="sans-serif" font-weight="900" font-size="24" fill="#f59e0b" text-anchor="middle" letter-spacing="4">
          LIONS
        </text>
      </svg>
    `
  }
];

const TEAMS_FOR_BANNERS = [
  { id: 'janakpur_bolts', name: 'JANAKPUR BOLTS', color1: '#EAB308', color2: '#1E3A8A', sub: 'CHAMPIONS • DHANUSHA & MADHESH' },
  { id: 'sudurpaschim_royals', name: 'SUDURPASCHIM ROYALS', color1: '#2563EB', color2: '#1E1B4B', sub: 'ROYAL PRIDE • DHANGADHI & FAR WEST' },
  { id: 'biratnagar_kings', name: 'BIRATNAGAR KINGS', color1: '#DC2626', color2: '#0F172A', sub: 'KINGS OF KOSHI • BIRATNAGAR' },
  { id: 'kathmandu_gurkhas', name: 'KATHMANDU GURKHAS', color1: '#059669', color2: '#064E3B', sub: 'VALLEY WARRIORS • KATHMANDU' },
  { id: 'pokhara_avengers', name: 'POKHARA AVENGERS', color1: '#06B6D4', color2: '#083344', sub: 'ANNAPURNA FORCE • POKHARA' },
  { id: 'chitwan_rhinos', name: 'CHITWAN RHINOS', color1: '#0D9488', color2: '#EA580C', sub: 'RHINO ROAR • BHARATPUR' },
  { id: 'karnali_yaks', name: 'KARNALI YAKS', color1: '#9333EA', color2: '#581C87', sub: 'HIMALAYAN POWER • SURKHET' },
  { id: 'lumbini_lions', name: 'LUMBINI LIONS', color1: '#B91C1C', color2: '#F59E0B', sub: 'DEFENDING CHAMPIONS • BUTWAL' },
];

async function generateAll() {
  // Generate crests
  for (const crest of CRESTS) {
    const dest = path.join(teamsDir, crest.file);
    await sharp(Buffer.from(crest.svg))
      .resize(400, 400)
      .png()
      .toFile(dest);
    console.log(`✓ Generated crest: ${crest.file}`);
  }

  // Generate team banners (1200x400)
  for (const t of TEAMS_FOR_BANNERS) {
    const bannerSvg = `
      <svg width="1200" height="400" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg_${t.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${t.color2}" />
            <stop offset="60%" stop-color="#0b0f19" />
            <stop offset="100%" stop-color="${t.color1}" stop-opacity="0.3" />
          </linearGradient>
        </defs>
        <rect width="1200" height="400" fill="url(#bg_${t.id})" />
        <rect x="0" y="385" width="1200" height="15" fill="${t.color1}" />

        <!-- Stadium grass and floodlight glow effects -->
        <circle cx="100" cy="50" r="180" fill="${t.color1}" fill-opacity="0.15" />
        <circle cx="1100" cy="350" r="220" fill="${t.color1}" fill-opacity="0.2" />

        <!-- Mountain silhouette -->
        <path d="M0 400 L200 240 L350 320 L550 180 L750 300 L950 200 L1200 380 Z" fill="#ffffff" fill-opacity="0.04" />

        <text x="80" y="160" font-family="sans-serif" font-weight="900" font-size="58" fill="#ffffff" letter-spacing="3">
          ${t.name.replace(/&/g, '&amp;')}
        </text>
        <text x="82" y="215" font-family="sans-serif" font-weight="800" font-size="22" fill="${t.color1}" letter-spacing="4">
          ${t.sub.replace(/&/g, '&amp;')}
        </text>
        <text x="82" y="265" font-family="sans-serif" font-weight="600" font-size="16" fill="#94a3b8" letter-spacing="2">
          NEPAL PREMIER LEAGUE 2026 • OFFICIAL FRANCHISE
        </text>
      </svg>
    `;

    const dest = path.join(bannersDir, `${t.id}-banner.jpg`);
    await sharp(Buffer.from(bannerSvg))
      .jpeg({ quality: 90 })
      .toFile(dest);
    console.log(`✓ Generated banner: ${t.id}-banner.jpg`);
  }
}

generateAll().catch(console.error);
