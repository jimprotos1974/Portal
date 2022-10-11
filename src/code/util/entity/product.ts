import { Observable } from 'rxjs';
import { Entity } from './entity';

export class Product extends Entity {
  override key = 'product';
}
