export declare class TeamsRepository {
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        league: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    getById(id: string | number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        league: string;
        createdAt: Date;
        updatedAt: Date;
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
    getByLeague(league: string): Promise<({
        team: import("@prisma/client/runtime").GetResult<{
            id: number;
            name: string;
            league: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        jerseyNumber: number;
        position: string;
        createdAt: Date;
        updatedAt: Date;
        team_id: number;
    }, unknown, never> & {})[]>;
}
