import { v4 as uuidv4 } from "uuid";
import { PlayerModel } from "../models";

export class PlayerBuilder {
  private id: number;
  private name: string = "TestPlayer";
  private jersey_number: number = 0;
  private position: string = "Unknown";

  build(): PlayerModel {
    const model: PlayerModel = {
      id: this.id ?? uuidv4(),
      name: this.name,
      jersey_number: this.jersey_number,
      position: this.position,
    };
    return model;
  }

  withId(id: number): PlayerBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): PlayerBuilder {
    this.name = name;
    return this;
  }

  withJerseyNumber(jersey_number: number): PlayerBuilder {
    this.jersey_number = jersey_number;
    return this;
  }

  withPosition(position: string): PlayerBuilder {
    this.position = position;
    return this;
  }
}