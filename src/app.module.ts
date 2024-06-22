import { Module } from '@nestjs/common';
import { ComparisonService } from './services/comparison.service';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [PostsController],
  providers: [PostsService, ComparisonService],
})
export class AppModule {}
