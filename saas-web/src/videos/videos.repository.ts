import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class VideosRepository {
  async getAll() {
    return await prisma.video.findMany();
  }

  async getByGameId(id: number) {
    const gameId = typeof id === 'string' ? parseInt(id, 10) : id;
    return await prisma.video.findMany({ where: { game_id: gameId } });
  }
}