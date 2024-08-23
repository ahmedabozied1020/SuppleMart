import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-outlined-button',
  standalone: true,
  imports: [],
  templateUrl: './outlined-button.component.html',
  styleUrl: './outlined-button.component.css',
})
export class OutlinedButtonComponent {
  @Input() label!: string;
}
