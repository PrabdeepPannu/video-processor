import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class VideosRepository {
  async getAll() {
    return await prisma.video.findMany();
  }

  async getByGameId(game_id: number) {
    return await prisma.video.findMany({ where: { game_id } });
  }
}