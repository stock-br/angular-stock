import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  public getProducts(): Observable<any> {
    return this._http.get(`${environment.baseUrl}/product`);
  }

  public getProductById(id: string): Observable<any> {
    return this._http.get(`${environment.baseUrl}/product/${id}`);
  }

  public createProduct(product: Product): Observable<any> {
    return this._http.post(`${environment.baseUrl}/product`, product);
  }

  public updateProduct(id: string, product: Product): Observable<any> {
    return this._http.put(`${environment.baseUrl}/product/${id}`, product);
  }

  public deleteProduct(product: Product): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/product/${product._id}`);
  }
}

export interface Product {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  models: Model[];
}
export interface Model {
  _id?: string;
  description: string;
  minimumAmount: number;
  costValue: number;
  saleValue: number;
}
