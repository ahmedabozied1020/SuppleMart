import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilterParamsService } from '../../../services/http-requests/filter-params/filter-params.service';
import {
  Options,
  LabelType,
  NgxSliderModule,
} from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css'],
})
export class PriceFilterComponent {
  minPrice: number = 100;
  maxPrice: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    },
  };
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
