import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../interfaces/product.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  authorId: number = 0;
  BASE_URL: string = environment.API_URL;
  $modal = new EventEmitter<any>();

  constructor(private http: HttpClient) {
    this.authorId = this.getRandomIntInclusive(1, 100);
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getProducts(): Observable<any> {
    return this.http
      .get<IProduct[]>(`${this.BASE_URL}/bp/products`, {
        headers: {
          authorId: '2',
        },
      })
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  sendProducts(data: any) {
    return this.http
      .post<any>(`${this.BASE_URL}/bp/products`, data, {
        headers: {
          authorId: '2',
        },
      })
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }

  editProducts(data: any) {
    return this.http
      .put<any>(`${this.BASE_URL}/bp/products`, data, {
        headers: {
          authorId: '2',
        },
      })
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  deleteProducts(id: any) {
    return this.http
      .delete(`${this.BASE_URL}/bp/products?id=${id}`, {
        headers: {
          authorId: '2',
        },
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
}
