import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, ContactUsComponent ,NotFoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
