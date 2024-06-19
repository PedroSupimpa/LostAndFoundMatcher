import { Body, Controller, Post } from '@nestjs/common';

import { PostsService } from 'src/services/posts.service';
import { PostDto } from '../dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('found')
  async postFoundItem(@Body() postDto: PostDto) {
    return this.postsService.processFoundItem(postDto);
  }

  @Post('lost')
  async postLostItem(@Body() postDto: PostDto) {
    return this.postsService.processLostItem(postDto);
  }
}
