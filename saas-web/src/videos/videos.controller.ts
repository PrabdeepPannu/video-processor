import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { RequestPerformanceInterceptor } from "../requestperformance.interceptor";
import { VideosRepository } from "./videos.repository";

// Video Controller
@Controller("videos")
@UseInterceptors(RequestPerformanceInterceptor)
export class VideosController {
  constructor(private readonly videosRepository: VideosRepository) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all Video entities" })
  @ApiResponse({ status: 200, description: "All Video entities" })
  async getAll() {
    return await this.videosRepository.getAll();
  }

  @Get("game/:game_id")
  @ApiOperation({ summary: "Retrieve Videos by Game ID" })
  @ApiParam({ name: "game_id", description: "The Game ID", required: true, type: Number })
  @ApiResponse({ status: 200, description: "Videos associated with the given Game ID" })
  async getByGameId(@Param("game_id") game_id: number) {
    return await this.videosRepository.getByGameId(game_id);
  }
}