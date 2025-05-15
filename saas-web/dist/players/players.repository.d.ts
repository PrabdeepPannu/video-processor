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
    getById(id: string | number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        jerseyNumber: number;
        position: string;
        createdAt: Date;
        updatedAt: Date;
        team_id: number;
    }, unknown, never> & {}>;
    getByName(name: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        jerseyNumber: number;
        position: string;
        createdAt: Date;
        updatedAt: Date;
        team_id: number;
    }, unknown, never> & {})[]>;
    getByJerseyNumber(jerseyNumber: string | number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        jerseyNumber: number;
        position: string;
        createdAt: Date;
        updatedAt: Date;
        team_id: number;
    }, unknown, never> & {}>;
    getByJerseyNumberAndTeamId(jerseyNumber: number, teamId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        jerseyNumber: number;
        position: string;
        createdAt: Date;
        updatedAt: Date;
        team_id: number;
    }, unknown, never> & {}>;
}
