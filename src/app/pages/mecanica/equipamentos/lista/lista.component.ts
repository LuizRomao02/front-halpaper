import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Equipamento {
  nome: string;
  codigo: string;
  setor: string;
  descricao: string;
  dataAquisicao: string;
}

@Component({
  selector: 'app-equipamento-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})

export class ListaEqComponent {
  filtros = {
    nome: '',
    codigo: '',
    setor: ''
  };

  equipamentoSelecionado: Equipamento | null = null;

  equipamentosFiltrados: Equipamento[] = [
    {
      nome: 'Compressor ABC',
      codigo: 'EQ-001',
      setor: 'Manutenção',
      descricao: 'Compressor industrial de alta pressão',
      dataAquisicao: '2024-03-12'
    },
    {
      nome: 'Esteira XYZ',
      codigo: 'EQ-002',
      setor: 'Produção',
      descricao: 'Esteira transportadora automática',
      dataAquisicao: '2023-11-25'
    }
  ];

  filtrar() {
    // Lógica de filtro pode ser implementada
    console.log('Filtrar:', this.filtros);
  }

  limpar() {
    this.filtros = {
      nome: '',
      codigo: '',
      setor: ''
    };
  }

  editar(eq: Equipamento) {
    console.log('Editar:', eq);
  }

  excluir(eq: Equipamento) {
    console.log('Excluir:', eq);
  }

  visualizar(eq: Equipamento) {
    this.equipamentoSelecionado = eq;
  }

  imprimir(equipamento: any): void {
    const campos = [
      "Nome do Equipamento", "Código", "Setor", "Descrição", "Data de Aquisição"
    ];

    const chaves = [
      "nome", "codigo", "setor", "descricao", "dataAquisicao"
    ];

    fetch('assets/templates/impressao-eq.html')
      .then(res => res.text())
      .then(html => {
        const win = window.open('', '_blank');
        if (!win) return;

        win.document.open();
        win.document.write(html);
        win.document.close();

        win.onload = () => {
          const tbody = win.document.getElementById('tabela-dados');
          if (!tbody) return;

          tbody.innerHTML = campos.map((label, i) => `
            <tr>
              <th>${label}</th>
              <td>${this.formatarCampo(equipamento[chaves[i]], chaves[i])}</td>
            </tr>
          `).join('');

          win.print();
        };
      });
  }

  formatarCampo(valor: any, campo: string): string {
    if (campo === "dataAquisicao" && valor) {
      return new Date(valor).toLocaleDateString('pt-BR');
    }
    return valor ?? '';
  }

  fecharVisualizacao() {
    this.equipamentoSelecionado = null;
  }

  formatarData(data: string): string {
    return data ? new Date(data).toLocaleDateString('pt-BR') : '';
  }
}
