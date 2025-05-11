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
}