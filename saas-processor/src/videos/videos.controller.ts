import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { VideosRepository } from "./videos.repository"
import { VideoProcesingService } from "./video-processing.service"

// Videos Controller
@Controller("videos")
export class VideosController {
  constructor(private readonly videosRepository: VideosRepository,
     private readonly videoProcessingService: VideoProcesingService) {}

  @Get(":id/download")
  @ApiOperation({ summary: "Download and process video in chunks" })
  @ApiParam({ name: "id", description: "The ID of the Video", required: true, type: Number })
  @ApiResponse({ status: 200, description: "Processed video data" })
  async downloadAndProcess(@Param("id") id: string) {
    const videoUrl = await this.videosRepository.getVideoUrlById(id);
    const result = await this.videoProcessingService.downloadAndProcessVideo(id, videoUrl);
    return { message: "Video processed", result };
  }
}
