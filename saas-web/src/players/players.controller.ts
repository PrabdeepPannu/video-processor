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

  @Get('jersey/:jerseyNumber')
  @ApiOperation({ summary: 'Retrieve a Player entity by Jersey Number' })
  @ApiParam({ name: 'jerseyNumber', description: 'The Jersey Number of the Player', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'A single Player entity with the given Jersey Number' })
  async getByJerseyNumber(@Param('jerseyNumber') jerseyNumber: number) {
    return await this.playersRepository.getByJerseyNumber(jerseyNumber);
  }

  // @Get('name/:name')
  // @ApiOperation({ summary: 'Retrieve a Player entity by Name' })
  // @ApiParam({ name: 'name', description: 'The Name of the Player', required: true, type: String })
  // @ApiResponse({ status: 200, description: 'A single Player entity with the given Name' })
  // async getByName(@Param('name') name: string) {
  //   return await this.playersRepository.getByName(name);
  // }
}