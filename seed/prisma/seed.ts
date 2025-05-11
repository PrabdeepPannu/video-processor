import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
const prisma = new PrismaClient();

function readJsonFile(fileName: string): any {
  try {
    if (!fileName || typeof fileName !== 'string') {
      throw new Error(`Invalid file name: ${fileName}`);
    }
    const filePath = `/opt/app/prisma/data/${fileName}`;
    const fileContent = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading file ${fileName}:`, error.message);
    return null;
  }
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

async function insertTeamsFromJson(fileName: string) {
  console.log('Starting to seed teams from JSON ...');
  const teamsData = readJsonFile(fileName);

  const teams = teamsData.map((team: any) => ({
    name: team.name,
    league: team.sport,
  }));

  await prisma.team.createMany({ data: teams });
  console.log('Finished seeding teams.');
}

async function insertPlayersFromJson(fileName: string) {
  console.log('Starting to seed players from JSON ...');
  const playersData = readJsonFile(fileName);

  const players = playersData.map((player: any) => ({
    name: player.name,
    jerseyNumber: Number(player.number),
    position: player.position || 'Unknown',
    team_id: Number(player.team_id),
  }));

  await prisma.player.createMany({ data: players });
  console.log('Finished seeding players.');
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
  await insertVenuesFromJson('venue.json');
  await insertTeamsFromJson('teams.json');
  await insertGamesFromJson('game.json');
  await insertVideosFromJson('videos.json');
  await insertPlayersFromJson('players.json');
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
