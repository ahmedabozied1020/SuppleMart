import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CartProductsService } from './services/observables/cart-products/cart-products.service';
import { CartProduct } from './interfaces/cart-product';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';

  constructor(private cartProductsService: CartProductsService) {}

  ngOnInit() {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts') || '');

    if (cartProducts) {
      this.cartProductsService.initializeCartProducts(cartProducts);
    }
  }
}
