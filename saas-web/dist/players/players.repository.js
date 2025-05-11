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
        return await prisma.player.findUnique({ where: { id } });
    }
}
exports.PlayersRepository = PlayersRepository;
//# sourceMappingURL=players.repository.js.map