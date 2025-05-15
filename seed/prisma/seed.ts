import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
const prisma = new PrismaClient();

// read JSON 
function readJsonFile(fn: string): any[] {
  try {
    if (!fn || typeof fn !== 'string') throw new Error(`bad filename: ${fn}`);
    const p = `/opt/app/prisma/data/${fn}`;
    const c = readFileSync(p, 'utf-8');
    return JSON.parse(c);
  } catch (e) {
    console.error(`oops: could not read ${fn}`, e.message);
    return [];
  }
}

// seed games\async
async function insertGamesFromJson(fn: string) {
  console.log('games ->', fn);
  const arr = readJsonFile(fn);
  const rows = arr.map((g: any) => ({
    name: g.name,
    date: new Date(g.date),
    sport: g.sport,
    venue_id: g.venue_id,
    team1_id: g.team1_id,
    team2_id: g.team2_id,
  }));
  await prisma.game.createMany({ data: rows });
  console.log('games done');
}

// seed venues
async function insertVenuesFromJson(fn: string) {
  console.log('venues ->', fn);
  const arr = readJsonFile(fn);
  const rows = arr.map((v: any) => ({ name: v.name, location: v.location, capacity: v.capacity }));
  await prisma.venue.createMany({ data: rows });
  console.log('venues done');
}

// seed teams
async function insertTeamsFromJson(fn: string) {
  console.log('teams ->', fn);
  const arr = readJsonFile(fn);
  const rows = arr.map((t: any) => ({ name: t.name, league: t.sport }));
  await prisma.team.createMany({ data: rows });
  console.log('teams done');
}

// seed players
async function insertPlayersFromJson(fn: string) {
  console.log('players ->', fn);
  const arr = readJsonFile(fn);
  const rows = arr.map((p: any) => ({
    name: p.name,
    jerseyNumber: Number(p.jerseyNumber),
    position: p.position || 'Unknown',
    team_id: Number(p.team_id),
  }));
  await prisma.player.createMany({ data: rows });
  console.log('players done');
}

// seed videos
async function insertVideosFromJson(fn: string) {
  console.log('videos ->', fn);
  const arr = readJsonFile(fn);
  for (const v of arr) {
    await prisma.video.create({ data: {
      preview: v.preview,
      url: v.url,
      format: v.format,
      duration: v.duration,
      resolution: v.resolution,
      frameRate: v.frameRate,
      game_id: v.game_id,
    }});
  }
  console.log('videos done');
}

// main
async function main() {
  console.log('start seeding');
  await insertVenuesFromJson('venue.json');
  await insertTeamsFromJson('teams.json');
  await insertGamesFromJson('game.json');
  await insertVideosFromJson('videos.json');
  await insertPlayersFromJson('players.json');
  console.log('all seeding done');
}

main()
  .then(async () => {
    console.log('bye');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('seed fail', e);
    await prisma.$disconnect();
    process.exit(1);
  });
