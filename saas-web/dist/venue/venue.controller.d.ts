import { VenuesRepository } from "./venue.repository";
export declare class VenuesController {
    private readonly venuesRepository;
    constructor(venuesRepository: VenuesRepository);
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        location: string;
        capacity: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        location: string;
        capacity: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
}
