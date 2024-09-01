import { Component } from '@angular/core';
import { FilledButtonComponent } from "../../components/buttons/filled-button/filled-button.component";
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FilledButtonComponent, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
