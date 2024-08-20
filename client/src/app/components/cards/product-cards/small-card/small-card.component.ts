import { Component, Input } from '@angular/core';
import { Category } from '../../../../interfaces/category';

@Component({
  selector: 'app-small-card',
  standalone: true,
  imports: [],
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.css'
})
export class SmallCardComponent {
  @Input() category!: Category;
  

}
