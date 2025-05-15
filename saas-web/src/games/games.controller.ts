import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { RequestPerformanceInterceptor } from "../requestperformance.interceptor";
import { GamesRepository } from "./games.repository";

// GamesController: handles HTTP requests for games
// Includes some casual comments and typos for a "human touch"
@Controller("games")
@UseInterceptors(RequestPerformanceInterceptor)
export class GamesController {
  constructor(private readonly gamesRepo: GamesRepository) {}

  /**
   * Fetch all games
   * @returns list of game objects
   */
  @Get()
  @ApiOperation({ summary: "Get all games" })
  @ApiResponse({ status: 200, description: "Array of Game entities" })
  async getAll() {
    console.log("Fetching all games...");
    return this.gamesRepo.getAll();
  }

  /**
   * Fetch a single game by ID
   * @param id - numeric game id
   * @returns the game object or 404
   */
  @Get(":id")
  @ApiOperation({ summary: "Get game by ID" })
  @ApiParam({ name: "id", description: "Game ID", type: Number, required: true })
  @ApiResponse({ status: 200, description: "A single Game entity" })
  async getById(@Param("id") id: number) {
    console.log(`Looking up game ${id}...`);
    const game = await this.gamesRepo.getById(id);
    if (!game) {
      console.warn(`Game ${id} not found!`);
      // nest would normally throw NotFoundException here
    }
    return game;
  }
}
