import { Component } from '@angular/core';

@Component({
  selector: 'app-empty',
  standalone: true,
  template: `
    <div class="spinner">
      <p>Carregando…</p>
    </div>
  `,
  styles: [
    `
    .spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-size: 1.2rem;
      color: #666;
    }
    `
  ]
})
export class EmptyComponent {}
