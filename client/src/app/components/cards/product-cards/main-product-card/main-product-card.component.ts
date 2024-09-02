import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { CartProductsService } from '../../../../services/observables/cart-products/cart-products.service';

@Component({
  selector: 'app-main-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-product-card.component.html',
  styleUrl: './main-product-card.component.css',
})
export class MainProductCardComponent {
  @Input() product!: Product;
  @Input() loading: boolean = true;

  constructor(private cartProductsService: CartProductsService) {}

  ngOnInit(){
    this.product && this.product.categories.splice(0,1); // to remove the 'ALL' category
  }

  handleAddToCart() {
    this.cartProductsService.addCartProduct(this.product._id, 1);
  }
}
