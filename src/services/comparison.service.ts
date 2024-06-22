import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageDto } from '../dto/image.dto';
import { LocationDto } from '../dto/location.dto';
import { PostDto } from '../dto/post.dto';
const Fuse = require('fuse.js');

@Injectable()
export class ComparisonService {
  private readonly apiUrl = 'https://lost-found-api-d361.onrender.com/user/getPosts?category=&page=1&postQty=10&sortPost=createdDate';

  constructor(private readonly httpService: HttpService) {}

  getExistingPosts(): Observable<PostDto[]> {
    return this.httpService.get(this.apiUrl)
      .pipe(map((response: AxiosResponse) => response.data.posts));
  }

  findMatches(post: PostDto, existingPosts: PostDto[]): PostDto[] {
    return existingPosts.filter(p => this.isMatch(post, p));
  }

  private isMatch(post1: PostDto, post2: PostDto): boolean {
    let matchCount = 0;

    const fuseOptions = {
      includeScore: true,
      threshold: 0.9,
      keys: ['title', 'description']
    };

    const fuse = new Fuse([post1], fuseOptions);

    const titleResult = fuse.search(post2.title);
    const descriptionResult = fuse.search(post2.description);
    

    if (titleResult.length > 0 && titleResult[0].score <= 0.9) matchCount++;
    if (descriptionResult.length > 0 && descriptionResult[0].score <= 0.9) matchCount++;

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
