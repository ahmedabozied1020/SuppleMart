import { Component } from '@angular/core';
import { FilledButtonComponent } from "../../components/buttons/filled-button/filled-button.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FilledButtonComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
