import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  getAll() {
    return this.http.get<Product[]>(`http://localhost:3000/products`);
  }
  getProductDetail(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
  deleteProduct(id: string | number) {
    return this.http.delete<Product>(`http://localhost:3000/products/${id}`);
  }
  addProduct(data: Product) {
    return this.http.post<Product>(`http://localhost:3000/products`, data);
  }
  editProduct(id: string | number, data: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${id}`, data);
  }
}
