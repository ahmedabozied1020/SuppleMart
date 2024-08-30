import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../../layouts/admin-navbar/admin-navbar.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pagination } from '../../interfaces/paginationData';
import { Product } from '../../interfaces/product';
import { FilterParamsService } from '../../services/http-requests/filter-params/filter-params.service';
import { PaginatedProductsService } from '../../services/http-requests/paginated-products/paginated-products.service';
import { AdminProductsTableComponent } from '../../components/admin-products-table/admin-products-table.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminNavbarComponent, AdminProductsTableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  title = 'Shop';
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
    this.route.queryParams.subscribe((p) => {
      const params = { ...p, page: Number(p['page']) || 1 };
      this.filtersParams.setFilters(params);
    });

    this.filterSubscription = this.filtersParams.filters$.subscribe(() => {
      this.fetchProducts();
    });
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
