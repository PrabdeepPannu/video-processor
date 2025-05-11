"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const path_1 = require("path");
const prisma = new client_1.PrismaClient();
function readJsonFile(fileName) {
    const filePath = path_1.default.join(__dirname, 'data', fileName);
    const fileContent = (0, fs_1.readFileSync)(filePath, 'utf-8');
    return JSON.parse(fileContent);
}
async function insertVenuesFromJson(fileName) {
    console.log('Starting to seed venues from JSON ...');
    const venuesData = readJsonFile(fileName);
    const venues = venuesData.map((venue) => ({
        name: venue.name,
        location: venue.location,
        capacity: venue.capacity
    }));
    await prisma.venue.createMany({ data: venues });
    console.log('Finished seeding venues.');
}
async function insertGamesFromJson(fileName) {
    console.log('Starting to seed games from JSON ...');
    const gamesData = readJsonFile(fileName);
    const games = gamesData.map((game) => ({
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
async function insertPlayersFromJson(directory) {
    console.log('Starting to seed players from JSON files ...');
    const files = (0, fs_1.readdirSync)(directory);
    for (const file of files) {
        const playersData = readJsonFile(path_1.default.join(directory, file));
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
async function insertTeamsFromJson(directory) {
    console.log('Starting to seed teams from JSON files ...');
    const files = (0, fs_1.readdirSync)(directory);
    for (const file of files) {
        const teamsData = readJsonFile(path_1.default.join(directory, file));
        const teams = Object.keys(teamsData).map((teamName) => ({
            name: teamName,
            league: 'Unknown'
        }));
        await prisma.team.createMany({ data: teams });
        console.log(`Finished seeding teams from ${file}.`);
    }
}
async function main() {
    console.log(`Start seeding ...`);
    await insertVenuesFromJson('testData/venue/venue.json');
    await insertTeamsFromJson('testData/teams');
    await insertPlayersFromJson('testData/teams');
    await insertGamesFromJson('testData/game.json');
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
//# sourceMappingURL=seed.js.map