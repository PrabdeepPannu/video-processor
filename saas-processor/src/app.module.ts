import { Module } from "@nestjs/common";

import { VideosRepository} from "./videos/videos.repository";
import { VideosController } from "./videos/videos.controller";
import { VideoProcesingService } from "./videos/video-processing.service";

@Module({
  imports: [],
  controllers: [VideosController],
  providers: [
    VideosRepository,
    VideoProcesingService
  ],
  exports: [VideoProcesingService], 
})
export class AppModule {}
