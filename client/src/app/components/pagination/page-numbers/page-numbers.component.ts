import { Component, Input, input, SimpleChanges } from '@angular/core';
import { Pagination } from '../../../interfaces/paginationData';
import { FilterParamsService } from '../../../services/http-requests/filter-params/filter-params.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-numbers',
  standalone: true,
  imports: [],
  templateUrl: './page-numbers.component.html',
  styleUrl: './page-numbers.component.css',
})
export class PageNumbersComponent {
  @Input() paginationData: Pagination | undefined;
  pages: number[] = [];
  currentPage: number = 1;
  filterSubscription!: Subscription;

  constructor(
    private filterParamsService: FilterParamsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filterSubscription = this.filterParamsService.filters$.subscribe(
      (params) => {
        this.currentPage = params.page;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paginationData'] && this.paginationData) {
      this.pages = Array.from(
        { length: this.paginationData.pages },
        (_, i) => i + 1
      );
    }
  }

  selectPage(page: number) {
    this.currentPage = page;
    this.filterParamsService.setFilters({ page });
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.selectPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.selectPage(this.currentPage + 1);
    }
  }
}
