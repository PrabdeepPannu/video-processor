import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Venues Repository
export class VenuesRepository {
  async getAll() {
    return await prisma.venue.findMany();
  }

  async getById(id: number) {
    return await prisma.venue.findUnique({ where: { id } });
  }
}