import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
