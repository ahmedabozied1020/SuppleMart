import { Component } from '@angular/core';
import { FilledButtonComponent } from "../../components/buttons/filled-button/filled-button.component";

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [FilledButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

}
