import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Product, ShoppingCartService } from '@/service/shopping-cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  products$ = this._shoppingCartService.products$;
  cart$ = this._shoppingCartService.cart$;
  totalPrice$ = this._shoppingCartService.getTotalPrice();

  constructor(private _shoppingCartService: ShoppingCartService) {}

  addToCart(product: Product) {
    this._shoppingCartService.addToCart(product);
  }

  removeFromCart(productId: number) {
    this._shoppingCartService.removeFromCart(productId);
  }
}
