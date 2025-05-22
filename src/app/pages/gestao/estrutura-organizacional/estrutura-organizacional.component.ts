import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estrutura-organizacional',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estrutura-organizacional.component.html',
  styleUrls: ['./estrutura-organizacional.component.scss'],
})
export class EstruturaOrganizacionalComponent {
  unidade = '';
  departamento = '';
  area = '';
  observacoes = '';

  cadastrar(): void {
    const estrutura = {
      unidade: this.unidade,
      departamento: this.departamento,
      area: this.area,
      observacoes: this.observacoes,
    };

    console.log('Estrutura cadastrada:', estrutura);
    // Enviar para serviço futuramente
  }
}
