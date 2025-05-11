import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Teams Repository
export class TeamsRepository {
  async getAll() {
    return await prisma.team.findMany();
  }

  async getById(id: number) {
    return await prisma.team.findUnique({ where: { id } });
  }

  async getByName(name: string) {
    return await prisma.player.findMany({ where: { name } });
  }

  async getByLeague(league: string) {
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