import { Component } from '@angular/core';
import { FiltersComponent } from '../../layouts/filters/filters.component';
import { ShopProductsComponent } from '../../layouts/shop-products/shop-products.component';
import { PaginationBarComponent } from '../../layouts/pagination-bar/pagination-bar.component';
import { ActivatedRoute } from '@angular/router';
import { FilterParamsService } from '../../services/http-requests/filter-params/filter-params.service';
import { PaginatedProductsService } from '../../services/http-requests/paginated-products/paginated-products.service';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/product';
import { Pagination } from '../../interfaces/paginationData';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FiltersComponent, ShopProductsComponent, PaginationBarComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  paginatedProducts: Product[] | undefined;
  paginationData: Pagination | undefined;
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
        this.paginatedProducts = paginatedData.paginatedProducts;
        this.paginationData = paginatedData.pagination;
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
