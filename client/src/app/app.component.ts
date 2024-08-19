import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { HeroSectionComponent } from './layouts/hero-section/hero-section.component';
import { FooterComponent } from './layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, HeroSectionComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
