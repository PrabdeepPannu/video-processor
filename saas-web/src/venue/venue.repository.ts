import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Venues Repository
export class VenuesRepository {
  async getAll() {
    return await prisma.venue.findMany();
  }

  async getById(id: string | number) {
    const venueId = typeof id === 'string' ? parseInt(id, 10) : id;
    return prisma.venue.findUnique({
      where: { id: venueId },
    });
  }
}