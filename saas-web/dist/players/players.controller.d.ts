import { PlayersRepository } from "./players.repository";
export declare class PlayersController {
    private readonly playersRepository;
    constructor(playersRepository: PlayersRepository);
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
    getByJerseyNumber(jerseyNumber: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        jerseyNumber: number;
        position: string;
        createdAt: Date;
        updatedAt: Date;
        team_id: number;
    }, unknown, never> & {}>;
}
