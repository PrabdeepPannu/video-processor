"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuesRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class VenuesRepository {
    async getAll() {
        return await prisma.venue.findMany();
    }
    async getById(id) {
        return await prisma.venue.findUnique({ where: { id } });
    }
}
exports.VenuesRepository = VenuesRepository;
//# sourceMappingURL=venue.repository.js.map