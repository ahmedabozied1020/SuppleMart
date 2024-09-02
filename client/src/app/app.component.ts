import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CartProductsService } from './services/observables/cart-products/cart-products.service';
import { CartProduct } from './interfaces/cart-product';
import { LoggedInUserService } from './services/observables/logged-in-user/logged-in-user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';

  constructor(
    private cartProductsService: CartProductsService,
    private loggedInUserService: LoggedInUserService
  ) {}

  ngOnInit() {
    const cartProducts = JSON.parse(
      localStorage.getItem('cartProducts') || '[]'
    );
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    if (cartProducts.length) {
      this.cartProductsService.initializeCartProducts(cartProducts);
    }

    if (Object.keys(loggedInUser).length) {
      this.loggedInUserService.initializeLoggedInUser(loggedInUser);
    }
  }
}
