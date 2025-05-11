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
        return await prisma.team.findUnique({ where: { id } });
    }
}
exports.TeamsRepository = TeamsRepository;
//# sourceMappingURL=teams.repository.js.map