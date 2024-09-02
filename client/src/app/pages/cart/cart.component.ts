import { FooterComponent } from './../../layouts/footer/footer.component';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { CartProductComponent } from '../../components/cards/cart-product/cart-product/cart-product.component';
import { CartService } from '../../services/http-requests/cart/cart.service';
import { CartProductsService } from '../../services/observables/cart-products/cart-products.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartProducts!: Product[];

  constructor(
    private cartService: CartService,
    private cartProductsService: CartProductsService
  ) {}

  ngOnInit() {
    this.cartProductsService.getCartProducts().subscribe((cartProds) => {
      const ids = cartProds.map(cartProd => cartProd.productId);
      this.cartService.getProductsByIds(ids).subscribe(products => this.cartProducts = products);
    });

    
  }
}
