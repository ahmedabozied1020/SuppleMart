import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../../components/filters/category-filter/category-filter.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CategoryFilterComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {}
