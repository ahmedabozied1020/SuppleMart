import { Component, Input } from '@angular/core';
import { AddProductButtonComponent } from '../../components/buttons/add-product-button/add-product-button.component';
import { PageNumbersComponent } from '../../components/pagination/page-numbers/page-numbers.component';
import { ResultsSummaryComponent } from '../../components/pagination/results-summary/results-summary.component';
import { Pagination } from '../../interfaces/paginationData';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    AddProductButtonComponent,
    PageNumbersComponent,
    ResultsSummaryComponent,
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent {
  @Input() paginationData: Pagination | undefined;
}
