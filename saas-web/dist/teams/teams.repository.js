"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TeamsRepository {
    async getAll() {
        return await prisma.team.findMany();
    }
    async getById(id) {
        const teamId = typeof id === 'string' ? parseInt(id, 10) : id;
        return prisma.team.findUnique({
            where: { id: teamId },
        });
    }
    async getByName(name) {
        return await prisma.player.findMany({ where: { name } });
    }
    async getByLeague(league) {
        return await prisma.player.findMany({
            where: {
                team: {
                    league: league,
                },
            },
            include: {
                team: true,
            },
        });
    }
}
exports.TeamsRepository = TeamsRepository;
//# sourceMappingURL=teams.repository.js.map