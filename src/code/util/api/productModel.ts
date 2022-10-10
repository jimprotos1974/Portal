import { Model } from '../../../pouch/model/model';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export class ProductModel extends Model {
  override fields = [
    {
      name: 'id',
      type: 'int',
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'discountPercentage',
      type: 'number',
    },
    {
      name: 'rating',
      type: 'number',
    },
    {
      name: 'stock',
      type: 'int',
    },
    {
      name: 'brand',
      type: 'string',
    },
    {
      name: 'category',
      type: 'string',
    },
    {
      name: 'thumbnail',
      type: 'string',
    },
    {
      name: 'images',
      type: 'auto',
    },
  ];
}
