import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private productsSubject = new BehaviorSubject<Product[]>([]);

  cart$ = this.cartSubject.asObservable();
  products$ = this.productsSubject.asObservable();

  constructor() {
    this.productsSubject.next([
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 300 },
    ]);
  }

  addToCart(product: Product) {
    this.cartSubject.next([...this.cartSubject.value, product]);
  }

  removeFromCart(productId: number) {
    this.cartSubject.next(
      this.cartSubject.value.filter((product) => product.id !== productId)
    );
  }

  getTotalPrice() {
    return this.cart$.pipe(
      map((products) =>
        products.reduce((acc, product) => acc + product.price, 0)
      )
    );
  }
}
