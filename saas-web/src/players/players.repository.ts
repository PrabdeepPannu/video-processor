import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Players Repository
export class PlayersRepository {
  async getAll() {
    return await prisma.player.findMany();
  }

  async getById(id: number) {
    return await prisma.player.findUnique({ where: { id } });
  }
}