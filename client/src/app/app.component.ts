import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilledButtonComponent } from './components/buttons/filled-button/filled-button.component';
import { SmallCardComponent } from './cards/small-card/small-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilledButtonComponent, SmallCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
