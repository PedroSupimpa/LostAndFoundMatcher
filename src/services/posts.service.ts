import { Injectable } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';
import { ComparisonService } from './comparison.service';

@Injectable()
export class PostsService {
  constructor(private readonly comparisonService: ComparisonService) {}

  async processFoundItem(postDto: PostDto) {
    const existingPosts = await this.comparisonService.getExistingPosts().toPromise();
    const matchedLostItems = this.comparisonService.findMatches(postDto, existingPosts);
    return { matchedLostItems };
  }

  async processLostItem(postDto: PostDto) {
    const existingPosts = await this.comparisonService.getExistingPosts().toPromise();
    const matchedFoundItems = this.comparisonService.findMatches(postDto, existingPosts);
    return { matchedFoundItems };
  }
}
