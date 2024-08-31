import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bread-crumbs',
  standalone: true,
  imports: [],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.css',
})
export class BreadCrumbsComponent {
  @Input() currentPageTitle = '';
}
