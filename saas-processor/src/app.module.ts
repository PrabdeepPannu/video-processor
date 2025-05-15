import { Module } from "@nestjs/common";

import { VideosRepository} from "./videos/videos.repository";
import { VideosController } from "./videos/videos.controller";
import { VideoProcessingService } from "./videos/video-processing.service";

@Module({
  imports: [],
  controllers: [VideosController],
  providers: [
    VideosRepository,
    VideoProcessingService
  ],
  exports: [VideoProcessingService], 
})
export class AppModule {}
