import { GamesRepository } from "./games.repository";
export declare class GamesController {
    private readonly gamesRepository;
    constructor(gamesRepository: GamesRepository);
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        date: Date;
        sport: string;
        createdAt: Date;
        updatedAt: Date;
        venue_id: number;
        team1_id: number;
        team2_id: number;
    }, unknown, never> & {})[]>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        date: Date;
        sport: string;
        createdAt: Date;
        updatedAt: Date;
        venue_id: number;
        team1_id: number;
        team2_id: number;
    }, unknown, never> & {}>;
}
