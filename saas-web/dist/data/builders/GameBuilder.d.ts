import { GameModel } from "../models";
export declare class GameBuilder {
    private id;
    private name;
    private date;
    private venue_id;
    private team1_id;
    private team2_id;
    build(): GameModel;
    withId(id: number): GameBuilder;
    withName(name: string): GameBuilder;
    withDate(date: Date): GameBuilder;
    withVenueId(venue_id: number): GameBuilder;
    withTeam1Id(team1_id: number): GameBuilder;
    withTeam2Id(team2_id: number): GameBuilder;
}
