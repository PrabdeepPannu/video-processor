import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { RequestPerformanceInterceptor } from "../requestperformance.interceptor";
import { TeamsRepository } from "./teams.repository";

// Team Controller, bringing in the vibes
@Controller("teams")
@UseInterceptors(RequestPerformanceInterceptor)
export class TeamsController {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all Team entities" })
  @ApiResponse({ status: 200, description: "All Team entities listed out" })
  async getAll() {
    console.log("Fetching all teams... fingers crossed!");
    return await this.teamsRepository.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a single Team entity by ID" })
  @ApiParam({ name: "id", description: "The ID of the Team", required: true, type: Number })
  @ApiResponse({ status: 200, description: "The Team entity you asked for" })
  async getById(@Param("id") id: number) {
    console.log(`Looking up team with ID: ${id}...`);
    const team = await this.teamsRepository.getById(id);
    if (!team) {
      console.warn(`Team not found: ${id}`);
      return { message: "Oops! Team not found." };
    }
    return team;
  }

  @Get("league/:league")
  @ApiOperation({ summary: "Get teams by League" })
  @ApiParam({ name: "league", description: "The League of the Teams", required: true, type: String })
  @ApiResponse({ status: 200, description: "A list of Teams in the specified League" })
  async getByLeague(@Param("league") league: string) {
    console.log(`Fetching teams from league: ${league}...`);
    const teams = await this.teamsRepository.getByLeague(league);
    if (!teams.length) {
      console.warn(`No teams found for league: ${league}`);
      return { message: "No teams found for this league." };
    }
    return teams;
  }
}
