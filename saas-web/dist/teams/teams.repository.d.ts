export declare class TeamsRepository {
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        league: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        league: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
}
