export declare class PlayersRepository {
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        jerseyNumber: number;
        position: string;
        createdAt: Date;
        updatedAt: Date;
        team_id: number;
    }, unknown, never> & {})[]>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        jerseyNumber: number;
        position: string;
        createdAt: Date;
        updatedAt: Date;
        team_id: number;
    }, unknown, never> & {}>;
}
