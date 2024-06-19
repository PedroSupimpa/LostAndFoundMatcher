import { IsArray, IsNumber } from 'class-validator';
import { PostDto } from './post.dto';

export class PostResponseDto {
  @IsArray()
  posts: PostDto[];

  @IsNumber()
  totalPages: number;
}
