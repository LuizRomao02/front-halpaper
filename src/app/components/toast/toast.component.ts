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
  type: 'success' | 'error' | 'warning' = 'success';

  /**
   * Exibe a toast com mensagem e tipo (success | error)
   * @param msg  mensagem a exibir
   * @param type 'success' ou 'error'
   * @param duration em milissegundos
   */
  show(msg: string, type: 'success' | 'error' | 'warning' = 'success', duration = 3000): void {
    this.message = msg;
    this.type = type;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, duration);
  }
}
