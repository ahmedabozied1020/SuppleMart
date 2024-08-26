import { Component, Input } from '@angular/core';
import { MainProductCardComponent } from '../../components/cards/product-cards/main-product-card/main-product-card.component';
import { OutlinedButtonComponent } from '../../components/buttons/outlined-button/outlined-button.component';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-shop-products',
  standalone: true,
  imports: [MainProductCardComponent, OutlinedButtonComponent],
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css'],
})
export class ShopProductsComponent {
  @Input() paginatedProducts: Product[] | undefined;

  constructor() {}
}
