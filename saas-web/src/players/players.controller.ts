import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { RequestPerformanceInterceptor } from "../requestperformance.interceptor";
import { PlayersRepository } from "./players.repository";

// Player Controller
@Controller("players")
@UseInterceptors(RequestPerformanceInterceptor)
export class PlayersController {
  constructor(private readonly playersRepository: PlayersRepository) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all Player entities" })
  @ApiResponse({
    status: 200,
    description: "All Player entities",
  })
  async getAll() {
    return await this.playersRepository.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a Player entity" })
  @ApiParam({ name: "id", description: "The ID of the Player", required: true, type: Number })
  @ApiResponse({ status: 200, description: "A single Player entity with the given ID" })
  async getById(@Param("id") id: number) {
    return await this.playersRepository.getById(id);
  }
}