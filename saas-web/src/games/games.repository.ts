import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Games Repository
export class GamesRepository {
  async getAll() {
    return await prisma.game.findMany();
  }

  async getById(id: number) {
    return await prisma.game.findUnique({ where: { id } });
  }
}