// src/videos/videos.controller.ts
import { Controller, Get, Param, InternalServerErrorException } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { VideosRepository } from "./videos.repository";
import { VideoProcessingService } from "./video-processing.service";

@Controller("videos")
export class VideosController {
  constructor(
    private readonly videosRepository: VideosRepository,
    private readonly videoProcessingService: VideoProcessingService
  ) {}

  @Get(":id/:url/download")
  @ApiOperation({ summary: "Download and process video by ID and URL" })
  @ApiParam({ name: "id", description: "The ID of the Video", required: true, type: String })
  @ApiParam({ name: "url", description: "The URL of the Video", required: true, type: String })
  @ApiResponse({ status: 200, description: "Processed video data" })
  async downloadAndProcess(@Param("id") id: string, @Param("url") url: string) {
    console.log(id, url);
    try {
      const players = await this.videoProcessingService.downloadAndProcessVideo(id, url);
      return { message: "Video processed", players };
    } catch (err) {
      throw new InternalServerErrorException(err.message || "Processing failed");
    }
  }
}
