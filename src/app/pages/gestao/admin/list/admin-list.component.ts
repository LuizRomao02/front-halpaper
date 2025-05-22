// admin-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent {
  nomeFiltro: string = '';
  emailFiltro: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 10;

  administradores = [
    { id: 1, nome: 'João Silva', email: 'joao@halpaper.com' },
    { id: 2, nome: 'Maria Santos', email: 'maria@halpaper.com' },
    { id: 3, nome: 'Carlos Oliveira', email: 'carlos@halpaper.com' },
    // Adicione mais para testes...
  ];

  get administradoresFiltrados() {
    const filtrados = this.administradores.filter(
      (a) =>
        a.nome.toLowerCase().includes(this.nomeFiltro.toLowerCase()) &&
        a.email.toLowerCase().includes(this.emailFiltro.toLowerCase())
    );
    const start = (this.paginaAtual - 1) * this.itensPorPagina;
    return filtrados.slice(start, start + this.itensPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(
      this.administradores.filter(
        (a) =>
          a.nome.toLowerCase().includes(this.nomeFiltro.toLowerCase()) &&
          a.email.toLowerCase().includes(this.emailFiltro.toLowerCase())
      ).length / this.itensPorPagina
    );
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
    }
  }

  excluirAdmin(id: number) {
    this.administradores = this.administradores.filter((a) => a.id !== id);
  }

  editarAdmin(id: number) {
    alert(`Editar administrador com ID ${id}`);
  }
}
