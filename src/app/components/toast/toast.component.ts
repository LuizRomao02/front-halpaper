import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  visible = false;
  message = '';

  show(msg: string, duration = 3000): void {
    this.message = msg;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, duration);
  }
}
