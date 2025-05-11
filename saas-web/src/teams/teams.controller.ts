import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { RequestPerformanceInterceptor } from "../requestperformance.interceptor";
import { TeamsRepository } from "./teams.repository";

// Team Controller
@Controller("teams")
@UseInterceptors(RequestPerformanceInterceptor)
export class TeamsController {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all Team entities" })
  @ApiResponse({ status: 200, description: "All Team entities" })
  async getAll() {
    return await this.teamsRepository.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a Team entity" })
  @ApiParam({ name: "id", description: "The ID of the Team", required: true, type: Number })
  @ApiResponse({ status: 200, description: "A single Team entity with the given ID" })
  async getById(@Param("id") id: number) {
    return await this.teamsRepository.getById(id);
  }

  @Get('league/:league')
  @ApiOperation({ summary: 'Retrieve team entities by League' })
  @ApiParam({ name: 'league', description: 'The League of the Players', required: true, type: String })
  @ApiResponse({ status: 200, description: 'A list of Player entities belonging to the given League' })
  async getByLeague(@Param('league') league: string) {
    return await this.teamsRepository.getByLeague(league);
  }
  
}