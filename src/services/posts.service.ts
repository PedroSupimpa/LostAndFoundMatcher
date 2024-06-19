import { Injectable } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';
import { LocationDto } from '../dto/location.dto';
import { ImageDto } from '../dto/image.dto';
import { IPostService } from 'src/interfaces/post.interface';
import Fuse from 'fuse.js';

@Injectable()
export class PostsService implements IPostService {
  private lostItems: PostDto[] = [];
  private foundItems: PostDto[] = [];

  processFoundItem(postDto: PostDto) {
    this.foundItems.push(postDto);
    const matchedLostItems = this.findMatches(postDto, this.lostItems);
    return { matchedLostItems };
  }

  processLostItem(postDto: PostDto) {
    this.lostItems.push(postDto);
    const matchedFoundItems = this.findMatches(postDto, this.foundItems);
    return { matchedFoundItems };
  }

  private findMatches(post: PostDto, posts: PostDto[]): PostDto[] {
    return posts.filter(p => this.isMatch(post, p));
  }

  private isMatch(post1: PostDto, post2: PostDto): boolean {
    let matchCount = 0;

    const fuseOptions = {
      includeScore: true,
      threshold: 0.4,
    };

    const titleFuse = new Fuse([post1.title], fuseOptions);
    const titleResult = titleFuse.search(post2.title);
    if (titleResult.length > 0 && titleResult[0].score <= 0.4) matchCount++;

    const descriptionFuse = new Fuse([post1.description], fuseOptions);
    const descriptionResult = descriptionFuse.search(post2.description);
    if (descriptionResult.length > 0 && descriptionResult[0].score <= 0.4) matchCount++;

    if (this.isLocationClose(post1.location, post2.location)) matchCount++;
    if (this.isImageSimilar(post1.images, post2.images)) matchCount++;

    return matchCount >= 3;
  }

  private isLocationClose(loc1: LocationDto, loc2: LocationDto): boolean {
    const latDistance = (loc1.x - loc2.x) * 111; // 1 grau de latitude ≈ 111 km
    const lonDistance = (loc1.y - loc2.y) * 111 * Math.cos(loc1.x * (Math.PI / 180)); // ajuste pela latitude

    const distance = Math.sqrt(latDistance ** 2 + lonDistance ** 2);
    const maxDistance = 5; // 5 km  

    return distance < maxDistance;
  }

  private isImageSimilar(images1: ImageDto[], images2: ImageDto[]): boolean {
    return images1.some(img1 => images2.some(img2 => img1.imageLink === img2.imageLink));
  }
}
