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

/*
{
		"id": 1,
		"title": "iPhone 9",
		"description": "An apple mobile which is nothing like apple",
		"price": 549,
		"discountPercentage": 12.96,
		"rating": 4.69,
		"stock": 94,
		"brand": "Apple",
		"category": "smartphones",
		"thumbnail": "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
		"images": ["https://dummyjson.com/image/i/products/1/1.jpg", "https://dummyjson.com/image/i/products/1/2.jpg", "https://dummyjson.com/image/i/products/1/3.jpg", "https://dummyjson.com/image/i/products/1/4.jpg", "https://dummyjson.com/image/i/products/1/thumbnail.jpg"]
	}
*/

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
