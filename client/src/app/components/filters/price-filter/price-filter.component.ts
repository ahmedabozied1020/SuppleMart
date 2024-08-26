import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterParamsService } from '../../../services/http-requests/filter-params/filter-params.service';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css'],
})
export class PriceFilterComponent {
  minPrice: number = 60;
  maxPrice: number = 760;

  constructor(
    private filtersParams: FilterParamsService,
    private router: Router
  ) {}

  handleFilterSubmit() {
    this.filtersParams.setFilters({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });

    this.router.navigate([], {
      queryParams: { minPrice: this.minPrice, maxPrice: this.maxPrice },

      queryParamsHandling: 'merge',
    });
  }
}
