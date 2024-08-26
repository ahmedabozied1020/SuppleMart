import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MainProductCardComponent } from '../../components/cards/product-cards/main-product-card/main-product-card.component';
import { OutlinedButtonComponent } from '../../components/buttons/outlined-button/outlined-button.component';
import { PaginatedProductsService } from '../../services/http-requests/paginated-products/paginated-products.service';
import { PaginatedProductsResponse } from '../../interfaces/PaginatedProductsResponse';
import { FilterParamsService } from '../../services/http-requests/filter-params/filter-params.service';

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
  private filterSubscription!: Subscription;

  constructor(
    private productRequestsService: PaginatedProductsService,
    private filtersParams: FilterParamsService,
    private route: ActivatedRoute
  ) {}

  fetchProducts() {
    this.subscription = this.productRequestsService
      .getProducts()
      .subscribe((paginatedData) => {
        this.paginatedData = paginatedData;
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filtersParams.setFilters(params);
    });

    this.filterSubscription = this.filtersParams.filters$.subscribe(() => {
      this.fetchProducts();
    });

    this.fetchProducts();
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
