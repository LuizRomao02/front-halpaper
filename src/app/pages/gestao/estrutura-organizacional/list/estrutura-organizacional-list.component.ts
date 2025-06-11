import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estrutura-organizacional-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estrutura-organizacional-list.component.html',
  styleUrls: ['./estrutura-organizacional-list.component.scss'],
})
export class EstruturaOrganizacionalListComponent {
  estruturas = [
    {
      id: 1,
      unidade: 'Fábrica Central',
      departamento: 'Manutenção',
      area: 'Área A',
      descricao: 'Área principal responsável por motores e compressores',
    },
    {
      id: 2,
      unidade: 'Unidade Norte',
      departamento: 'Produção',
      area: 'Linha 1',
      descricao: 'Linha de produção automatizada',
    },
    // Adicione mais exemplos conforme desejar
  ];

  filtroNome = '';
  paginaAtual = 1;
  itensPorPagina = 10;
  estruturaSelecionada: any = null;

  get estruturasFiltradas() {
    const filtradas = this.estruturas.filter((e) =>
      e.unidade.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
    const start = (this.paginaAtual - 1) * this.itensPorPagina;
    return filtradas.slice(start, start + this.itensPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(
      this.estruturas.filter((e) =>
        e.unidade.toLowerCase().includes(this.filtroNome.toLowerCase())
      ).length / this.itensPorPagina
    );
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) this.paginaAtual--;
  }

  paginaProxima() {
    if (this.paginaAtual < this.totalPaginas) this.paginaAtual++;
  }

  visualizarDetalhes(estrutura: any) {
    this.estruturaSelecionada = estrutura;
  }

  fecharModal() {
    this.estruturaSelecionada = null;
  }

  editarEstrutura(id: number) {
    console.log('Editar estrutura:', id);
  }

  excluirEstrutura(id: number) {
    console.log('Excluir estrutura:', id);
  }
}
