import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  authorId: number = 0;
  BASE_URL: string = environment.API_URL
  
  constructor(
    private http: HttpClient
  ) {
    this.authorId = this.getRandomIntInclusive(1, 100);
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getProducts() {
    return this.http.get<IProduct[]>(`${this.BASE_URL}/bp/products`, {
      headers: {
        'authorId': this.authorId.toString(),
      },
    });
  }
}
