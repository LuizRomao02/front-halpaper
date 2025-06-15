import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tecnico {
  nome: string;
  matricula: string;
  especialidade: string;
  setor: string;
  disponibilidade: string;
  certificacoes: string;
}

@Component({
  selector: 'app-tecnicos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})

export class ListaTecComponent {
  tecnicoSelecionado: Tecnico | null = null;

  filtros = {
    nome: '',
    especialidade: '',
    setor: '',
    disponibilidade: ''
  };

  tecnicos: Tecnico[] = [
    {
      nome: 'João da Silva',
      matricula: '001',
      especialidade: 'Elétrica',
      setor: 'Manutenção',
      disponibilidade: 'Disponível',
      certificacoes: 'NR10, NR35'
    },
    {
      nome: 'Ana Souza',
      matricula: '002',
      especialidade: 'Mecânica',
      setor: 'Produção',
      disponibilidade: 'Em OS',
      certificacoes: 'Soldagem, Manutenção Industrial'
    }
  ];

  get tecnicosFiltrados(): Tecnico[] {
    return this.tecnicos.filter(t =>
      t.nome.toLowerCase().includes(this.filtros.nome.toLowerCase()) &&
      t.especialidade.toLowerCase().includes(this.filtros.especialidade.toLowerCase()) &&
      t.setor.toLowerCase().includes(this.filtros.setor.toLowerCase()) &&
      t.disponibilidade.toLowerCase().includes(this.filtros.disponibilidade.toLowerCase())
    );
  }

  visualizar(tecnico: Tecnico) {
    this.tecnicoSelecionado = tecnico;
  }

  fecharVisualizacao() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.classList.add('hide');
      setTimeout(() => this.tecnicoSelecionado = null, 300);
    } else {
      this.tecnicoSelecionado = null;
    }
  }

  editar(tecnico: Tecnico) {
    console.log('Editar técnico:', tecnico);
  }

  excluir(tecnico: Tecnico) {
    console.log('Excluir técnico:', tecnico);
  }

  imprimir(tecnico: any) {
    const campos = [
      "Nome Completo",
      "Matrícula / Código",
      "Especialidade",
      "Setor",
      "Disponibilidade",
      "Certificações"
    ];

    const chaves = [
      "nome",
      "matricula",
      "especialidade",
      "setor",
      "disponibilidade",
      "certificacoes"
    ];

    fetch('assets/templates/impressao-tec.html')
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
              <td>${tecnico[chaves[i]] ?? ''}</td>
            </tr>
          `).join('');

          const logo = win.document.querySelector("img");
          if (logo && !logo.complete) {
            logo.onload = () => win.print();
          } else {
            win.print();
          }
        };
      });
  }

}
