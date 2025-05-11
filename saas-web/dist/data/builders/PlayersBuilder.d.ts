import { PlayerModel } from "../models";
export declare class PlayerBuilder {
    private id;
    private name;
    private jersey_number;
    private position;
    build(): PlayerModel;
    withId(id: number): PlayerBuilder;
    withName(name: string): PlayerBuilder;
    withJerseyNumber(jersey_number: number): PlayerBuilder;
    withPosition(position: string): PlayerBuilder;
}
