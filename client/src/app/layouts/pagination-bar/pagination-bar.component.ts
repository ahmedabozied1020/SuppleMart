import { Component, Input, input } from '@angular/core';
import { SortsFilterComponent } from '../../components/filters/sorts-filter/sorts-filter.component';
import { ResultsSummaryComponent } from '../../components/pagination/results-summary/results-summary.component';
import { PageNumbersComponent } from '../../components/pagination/page-numbers/page-numbers.component';
import { Pagination } from '../../interfaces/paginationData';
@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [
    SortsFilterComponent,
    ResultsSummaryComponent,
    PageNumbersComponent,
  ],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.css',
})
export class PaginationBarComponent {
  @Input() paginationData: Pagination | undefined;
}
