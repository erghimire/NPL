import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('public/assets');
const playersDir = path.join(assetsDir, 'players');
const teamsDir = path.join(assetsDir, 'teams');
const stadiumDir = path.join(assetsDir, 'stadium');

[assetsDir, playersDir, teamsDir, stadiumDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const IMAGES_TO_DOWNLOAD = [
  // NPL & Stadium
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Nepal_Premier_League_official_logo.png',
    dest: path.join(teamsDir, 'npl-logo.png')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Kirtipur_Cricket_Stadium.jpg',
    dest: path.join(stadiumDir, 'tu-ground.jpg')
  },
  // Team logos
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Janakpur_Bolts_Official_Logo.png',
    dest: path.join(teamsDir, 'janakpur-bolts.png')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_of_Biratnagar_Kings.jpg',
    dest: path.join(teamsDir, 'biratnagar-kings.jpg')
  },
  // Real Players
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Sandeep_Lamichhane_in_2018.png/330px-Sandeep_Lamichhane_in_2018.png',
    dest: path.join(playersDir, 'sandeep-lamichhane.png')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dsairee.jpg/330px-Dsairee.jpg',
    dest: path.join(playersDir, 'dipendra-singh-airee.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Rohit-Paudel-Pic.jpg/330px-Rohit-Paudel-Pic.jpg',
    dest: path.join(playersDir, 'rohit-paudel.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Sompal_Kami_Cricketer.jpg/330px-Sompal_Kami_Cricketer.jpg',
    dest: path.join(playersDir, 'sompal-kami.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Karan_Kc_Nepali_Cricketer.jpg/330px-Karan_Kc_Nepali_Cricketer.jpg',
    dest: path.join(playersDir, 'karan-kc.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kushal-bhurtel.jpg/330px-Kushal-bhurtel.jpg',
    dest: path.join(playersDir, 'kushal-bhurtel.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Aasif_Sheikh.jpg/330px-Aasif_Sheikh.jpg',
    dest: path.join(playersDir, 'aasif-sheikh.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Martin_Guptill_MNZM_%28cropped%29.jpg/330px-Martin_Guptill_MNZM_%28cropped%29.jpg',
    dest: path.join(playersDir, 'martin-guptill.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/SHIKHAR_DHAWAN_%2816005494418%29.jpg/330px-SHIKHAR_DHAWAN_%2816005494418%29.jpg',
    dest: path.join(playersDir, 'shikhar-dhawan.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Scott_Kuggeleijn.jpg/330px-Scott_Kuggeleijn.jpg',
    dest: path.join(playersDir, 'scott-kuggeleijn.jpg')
  }
];

async function downloadAll() {
  const headers = { 'User-Agent': 'NepalPremierLeagueApp/1.0 (info@nplcricket.np)' };

  for (const item of IMAGES_TO_DOWNLOAD) {
    try {
      console.log(`Downloading ${path.basename(item.dest)}...`);
      const res = await fetch(item.url, { headers });
      if (!res.ok) {
        console.warn(`Failed to fetch ${item.url}: ${res.statusText}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(item.dest, buffer);
      console.log(`✓ Saved ${path.basename(item.dest)}`);
    } catch (err) {
      console.error(`Error downloading ${item.url}:`, err);
    }
  }

  console.log('Download complete!');
}

downloadAll();
