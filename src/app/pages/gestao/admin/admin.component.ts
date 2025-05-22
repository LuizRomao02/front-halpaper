import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  nome = '';
  email = '';
  senha = '';
  acessosDisponiveis = ['Mecânica', 'Produção', 'Logística', 'Gestão'];
  acessosSelecionados: string[] = [];

  toggleAcesso(acesso: string): void {
    const index = this.acessosSelecionados.indexOf(acesso);
    if (index >= 0) {
      this.acessosSelecionados.splice(index, 1);
    } else {
      this.acessosSelecionados.push(acesso);
    }
  }

  cadastrar(): void {
    const admin = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      acessos: this.acessosSelecionados,
    };

    console.log('Admin cadastrado:', admin);
    // Aqui você pode enviar o objeto para um serviço futuramente
  }
}
