import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilledButtonComponent } from './components/buttons/filled-button/filled-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilledButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
