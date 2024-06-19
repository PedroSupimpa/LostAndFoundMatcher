import { IsString, IsNumber } from 'class-validator';

export class ImageDto {
  @IsString()
  imageLink: string;

  @IsNumber()
  postId: number;
}
