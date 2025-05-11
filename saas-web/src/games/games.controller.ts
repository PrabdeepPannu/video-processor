import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { RequestPerformanceInterceptor } from "../requestperformance.interceptor";
import { GamesRepository } from "./games.repository";

// Game Controller
@Controller("games")
@UseInterceptors(RequestPerformanceInterceptor)
export class GamesController {
  constructor(private readonly gamesRepository: GamesRepository) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all Game entities" })
  @ApiResponse({ status: 200, description: "All Game entities" })
  async getAll() {
    return await this.gamesRepository.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a Game entity" })
  @ApiParam({ name: "id", description: "The ID of the Game", required: true, type: Number })
  @ApiResponse({ status: 200, description: "A single Game entity with the given ID" })
  async getById(@Param("id") id: number) {
    return await this.gamesRepository.getById(id);
  }
}