import { TeamsRepository } from "./teams.repository";
export declare class TeamsController {
    private readonly teamsRepository;
    constructor(teamsRepository: TeamsRepository);
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        league: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    getById(id: number): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        league: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}) | {
        message: string;
    }>;
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
    }, unknown, never> & {})[] | {
        message: string;
    }>;
}
