import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bread-crumbs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.css',
})
export class BreadCrumbsComponent {
  @Input() currentPageTitle = '';
}
