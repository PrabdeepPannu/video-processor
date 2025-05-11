"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class GamesRepository {
    async getAll() {
        return await prisma.game.findMany();
    }
    async getById(id) {
        return await prisma.game.findUnique({ where: { id } });
    }
}
exports.GamesRepository = GamesRepository;
//# sourceMappingURL=games.repository.js.map