import { Component } from '@angular/core';
import { HeroSectionComponent } from './layout/hero-section/hero-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
