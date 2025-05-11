import { v4 as uuidv4 } from "uuid";
import { TeamModel } from "../models";

export class TeamBuilder {
    private id: number;
    private name: string = "TestTeam";
    private league: string = "Unknown";
  
    build(): TeamModel {
      const model: TeamModel = {
        id: this.id ?? uuidv4(),
        name: this.name,
        league: this.league,
      };
      return model;
    }
  
    withId(id: number): TeamBuilder {
      this.id = id;
      return this;
    }
  
    withName(name: string): TeamBuilder {
      this.name = name;
      return this;
    }
  
    withLeague(league: string): TeamBuilder {
      this.league = league;
      return this;
    }
  }