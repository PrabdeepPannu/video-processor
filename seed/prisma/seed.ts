import { PrismaClient } from '@prisma/client';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';
const prisma = new PrismaClient();

function readJsonFile(fileName: string): any {
  const filePath = path.join(__dirname, 'data', fileName);
  const fileContent = readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

async function insertVenuesFromJson(fileName: string) {
  console.log('Starting to seed venues from JSON ...');
  const venuesData = readJsonFile(fileName);
  const venues = venuesData.map((venue: any) => ({
    name: venue.name,
    location: venue.location,
    capacity: venue.capacity
  }));
  await prisma.venue.createMany({ data: venues });
  console.log('Finished seeding venues.');
}

async function insertGamesFromJson(fileName: string) {
  console.log('Starting to seed games from JSON ...');
  const gamesData = readJsonFile(fileName);
  const games = gamesData.map((game: any) => ({
    name: game.name,
    date: new Date(game.date),
    sport: game.sport,
    venue_id: game.venue_id,
    team1_id: game.team1_id,
    team2_id: game.team2_id
  }));
  await prisma.game.createMany({ data: games });
  console.log('Finished seeding games.');
}


async function insertPlayersFromJson(directory: string) {
  console.log('Starting to seed players from JSON files ...');
  const files = readdirSync(directory);
  for (const file of files) {
    const playersData = readJsonFile(path.join(directory, file));
    const players = Object.entries(playersData).map(([name, jersey_number]) => ({
      name,
      jerseyNumber: Number(jersey_number),
      position: 'Unknown',
      is_active: true
    }));
    await prisma.player.createMany({ data: players });
    console.log(`Finished seeding players from ${file}.`);
  }
}

async function insertTeamsFromJson(directory: string) {
  console.log('Starting to seed teams from JSON files ...');
  const files = readdirSync(directory);
  for (const file of files) {
    const teamsData = readJsonFile(path.join(directory, file));
    const teams = Object.keys(teamsData).map((teamName) => ({
      name: teamName,
      league: 'Unknown'
    }));
    await prisma.team.createMany({ data: teams });
    console.log(`Finished seeding teams from ${file}.`);
  }
}


async function insertVideosFromJson(fileName: string) {
  const videosData = readJsonFile(fileName);
    console.log('Starting to seed videos from JSON files ...');
    for (const video of videosData) {
      await prisma.video.create({
        data: {
          url: video.url,
          format: video.format,
          duration: video.duration,
          resolution: video.resolution,
          frameRate: video.frameRate,
          game_id: video.game_id
        }
      });
    }
    console.log(`Finished seeding videos`);
}

async function main() {
  console.log(`Start seeding ...`);
  await insertVenuesFromJson('testData/venue/venue.json');
  await insertTeamsFromJson('testData/teams');
  await insertPlayersFromJson('testData/teams');
  await insertGamesFromJson('testData/game.json');
  await insertVideosFromJson("testData/videos.json");
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
