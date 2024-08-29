import { Component, Input } from '@angular/core';
import { Pagination } from '../../../interfaces/paginationData';

@Component({
  selector: 'app-results-summary',
  standalone: true,
  imports: [],
  templateUrl: './results-summary.component.html',
  styleUrl: './results-summary.component.css',
})
export class ResultsSummaryComponent {
  @Input() paginationData: Pagination | undefined;
  showingFromNumber: number = 1;
  showingToNumber: number = 12;
  totalProducts: number = 0;

  updateShowingNumbers() {
    if (this.paginationData) {
      this.totalProducts = this.paginationData.total;
      this.showingFromNumber =
        (this.paginationData.page - 1) * this.paginationData.limit + 1;
      this.showingToNumber = Math.min(
        this.paginationData.page * this.paginationData.limit,
        this.totalProducts
      );
    }
  }

  ngOnInit() {
    if (this.paginationData) {
      this.totalProducts = this.paginationData.total;
      this.updateShowingNumbers();
    }
  }

  ngOnChanges() {
    this.updateShowingNumbers();
  }
}
