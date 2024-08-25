import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainProductCardComponent } from '../../components/cards/product-cards/main-product-card/main-product-card.component';
import { OutlinedButtonComponent } from '../../components/buttons/outlined-button/outlined-button.component';
import { PaginatedProductsService } from '../../services/http-requests/paginated-products/paginated-products.service';
import { PaginatedProductsResponse } from '../../interfaces/PaginatedProductsResponse';

@Component({
  selector: 'app-shop-products',
  standalone: true,
  imports: [MainProductCardComponent, OutlinedButtonComponent],
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css'],
})
export class ShopProductsComponent implements OnInit, OnDestroy {
  paginatedData: PaginatedProductsResponse | undefined;
  private subscription!: Subscription;

  constructor(private productRequestsService: PaginatedProductsService) {}

  ngOnInit() {
    const category = 'all';
    const page = 1;
    const limit = 12;
    const minPrice = 10;
    const maxPrice = 100;
    const minRating = 2;
    const searchQuery = '';

    this.subscription = this.productRequestsService
      .getProducts(
        category,
        page,
        limit,
        minPrice,
        maxPrice,
        minRating,
        searchQuery
      )
      .subscribe((paginatedData) => {
        this.paginatedData = paginatedData;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
