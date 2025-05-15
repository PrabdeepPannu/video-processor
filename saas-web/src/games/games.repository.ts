import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Games Repository
export class GamesRepository {
  async getAll() {
    return await prisma.game.findMany();
  }


  async getById(id: string | number) {
    const gameId = typeof id === 'string' ? parseInt(id, 10) : id;
    return prisma.game.findUnique({
      where: { id: gameId },
    });
  }

}