import { ILocation } from './location.interface';
import { ICategory } from './category.interface';
import { IImage } from './image.interface';

export interface IPost {
  id: number;
  title: string;
  description: string;
  location: ILocation;
  createdDate: string;
  closedDate: any;
  category: ICategory;
  images: IImage[];
}

export interface IPostService {
  processFoundItem(postDto: IPost): any;
  processLostItem(postDto: IPost): any;
}
