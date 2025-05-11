import { v4 as uuidv4 } from "uuid";
import { GameModel } from "../models";

export class GameBuilder {
  private id: number;
  private name: string = "TestGame";
  private date: Date = new Date();
  private venue_id: number;
  private team1_id: number;
  private team2_id: number;

  build(): GameModel {
    const model: GameModel = {
      id: this.id ?? uuidv4(),
      name: this.name,
      date: this.date,
      venue_id: this.venue_id,
      team1_id: this.team1_id,
      team2_id: this.team2_id,
    };
    return model;
  }

  withId(id: number): GameBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): GameBuilder {
    this.name = name;
    return this;
  }

  withDate(date: Date): GameBuilder {
    this.date = date;
    return this;
  }

  withVenueId(venue_id: number): GameBuilder {
    this.venue_id = venue_id;
    return this;
  }

  withTeam1Id(team1_id: number): GameBuilder {
    this.team1_id = team1_id;
    return this;
  }

  withTeam2Id(team2_id: number): GameBuilder {
    this.team2_id = team2_id;
    return this;
  }
}
