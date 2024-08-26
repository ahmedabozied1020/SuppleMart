import { Component } from '@angular/core';
import { FiltersComponent } from '../../layouts/filters/filters.component';
import { ShopProductsComponent } from '../../layouts/shop-products/shop-products.component';
import { PaginationBarComponent } from '../../layouts/pagination-bar/pagination-bar.component';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FiltersComponent, ShopProductsComponent, PaginationBarComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}
