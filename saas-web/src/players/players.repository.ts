import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Players Repository
export class PlayersRepository {
  async getAll() {
    return await prisma.player.findMany();
  }

  async getById(id: string | number) {
    const playerId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    // Check if playerId is a valid number
    if (isNaN(playerId)) {
      throw new Error('Invalid player ID');
    }
    
    return prisma.player.findUnique({
      where: { id: playerId },
    });
  }
  

  async getByName(name: string) {
    return await prisma.player.findMany({ where: { name } });
  }

  async getByJerseyNumber(jerseyNumber: string | number) {
    const jerseyNumberId = typeof jerseyNumber === 'string' ? parseInt(jerseyNumber, 10) : jerseyNumber;
  
    if (isNaN(jerseyNumberId)) {
      throw new Error('Invalid jersey number');
    }
  
    return prisma.player.findFirst({
      where: { jerseyNumber: jerseyNumberId },
    });
  }
  

  async getByJerseyNumberAndTeamId(jerseyNumber: number, teamId: number) {
  
    const teamExists = await prisma.team.findUnique({
      where: { id: teamId },
    });
  
    if (!teamExists) {
      throw new Error('Team not found');
    }
  
    return prisma.player.findFirst({
      where: {
        jerseyNumber: jerseyNumber,
        team_id: teamId,
      },
    });
  }

}