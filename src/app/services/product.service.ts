import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  name: string;
  price: number;
  category: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([
    { name: 'Smart Phone', price: 10.0, category: 'Electronics', quantity: 5 },
    { name: 'T-Shirt', price: 20.0, category: 'Clothing', quantity: 0 },
    { name: 'Novel', price: 30.0, category: 'Books', quantity: 10 },
  ]);

  products$ = this.productsSubject.asObservable();

  getProducts(): Product[] {
    return this.productsSubject.getValue();
  }

  addProduct(product: Product): void {
    const products = [...this.getProducts(), product];
    this.productsSubject.next(products);
  }

  updateProduct(index: number, product: Product): void {
    const products = this.getProducts();
    products[index] = product;
    this.productsSubject.next([...products]);
  }

  deleteProduct(index: number){
    const products = this.getProducts();
    products.splice(index, 1);
    this.productsSubject.next([...products]);
  }
}
