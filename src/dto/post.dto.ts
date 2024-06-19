import { IsString, IsNumber, IsArray, IsOptional, IsDateString } from 'class-validator';
import { LocationDto } from './location.dto';
import { CategoryDto } from './category.dto';
import { ImageDto } from './image.dto';

export class PostDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  location: LocationDto;

  @IsDateString()
  createdDate: string;

  @IsOptional()
  closedDate?: any;

  category: CategoryDto;

  @IsArray()
  images: ImageDto[];
}
