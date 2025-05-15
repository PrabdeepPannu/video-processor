"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PlayersRepository {
    async getAll() {
        return await prisma.player.findMany();
    }
    async getById(id) {
        const playerId = typeof id === 'string' ? parseInt(id, 10) : id;
        if (isNaN(playerId)) {
            throw new Error('Invalid player ID');
        }
        return prisma.player.findUnique({
            where: { id: playerId },
        });
    }
    async getByName(name) {
        return await prisma.player.findMany({ where: { name } });
    }
    async getByJerseyNumber(jerseyNumber) {
        const jerseyNumberId = typeof jerseyNumber === 'string' ? parseInt(jerseyNumber, 10) : jerseyNumber;
        if (isNaN(jerseyNumberId)) {
            throw new Error('Invalid jersey number');
        }
        return prisma.player.findFirst({
            where: { jerseyNumber: jerseyNumberId },
        });
    }
    async getByJerseyNumberAndTeamId(jerseyNumber, teamId) {
        const teamExists = await prisma.team.findUnique({
            where: { id: teamId },
        });
        if (!teamExists) {
            throw new Error('Team not found');
        }
        return prisma.player.findFirst({
            where: {
                jerseyNumber: jerseyNumber,
                team_id: teamId,
            },
        });
    }
}
exports.PlayersRepository = PlayersRepository;
//# sourceMappingURL=players.repository.js.map