export declare class VenuesRepository {
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        location: string;
        capacity: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    getById(id: string | number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        location: string;
        capacity: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
}
