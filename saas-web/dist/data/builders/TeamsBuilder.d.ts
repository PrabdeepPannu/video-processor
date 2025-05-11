import { TeamModel } from "../models";
export declare class TeamBuilder {
    private id;
    private name;
    private league;
    build(): TeamModel;
    withId(id: number): TeamBuilder;
    withName(name: string): TeamBuilder;
    withLeague(league: string): TeamBuilder;
}
