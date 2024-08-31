import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filled-button',
  standalone: true,
  imports: [],
  templateUrl: './filled-button.component.html',
  styleUrl: './filled-button.component.css'
})
export class FilledButtonComponent {
  @Input() label!: string;
}