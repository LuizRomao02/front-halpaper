import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prontuario-tecnico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.scss'],
})
export class ProntuarioTecnicoComponent {
  tecnicoSelecionado: any = null;

  filtro = {
    nome: '',
    especialidade: '',
    setor: '',
    disponibilidade: ''
  };

  especialidades = ['Mecânica', 'Elétrica', 'Hidráulica'];
  setores = ['Produção', 'Manutenção', 'Qualidade'];

  tecnicos = [
    {
      nome: 'João Silva',
      matricula: 'TEC001',
      especialidade: 'Mecânica',
      setor: 'Produção',
      disponibilidade: 'Disponível',
      certificacoes: 'Curso de NR-10, Manutenção Mecânica Avançada'
    },
    {
      nome: 'Maria Oliveira',
      matricula: 'TEC002',
      especialidade: 'Elétrica',
      setor: 'Manutenção',
      disponibilidade: 'Em OS',
      certificacoes: 'NR-35, Elétrica Industrial'
    },
    {
      nome: 'Carlos Souza',
      matricula: 'TEC003',
      especialidade: 'Hidráulica',
      setor: 'Qualidade',
      disponibilidade: 'De folga',
      certificacoes: 'Hidráulica Básica, Técnico em Qualidade'
    },
    {
      nome: 'Luiz Henrique',
      matricula: 'TEC003',
      especialidade: 'Hidráulica',
      setor: 'Qualidade',
      disponibilidade: 'Disponível',
      certificacoes: 'Hidráulica Básica, Técnico em Qualidade'
    }
  ];

  tecnicosFiltrados() {
    return this.tecnicos.filter(tecnico =>
      tecnico.nome.toLowerCase().includes(this.filtro.nome.toLowerCase()) &&
      (!this.filtro.especialidade || tecnico.especialidade === this.filtro.especialidade) &&
      (!this.filtro.setor || tecnico.setor === this.filtro.setor) &&
      (!this.filtro.disponibilidade || tecnico.disponibilidade === this.filtro.disponibilidade)
    );
  }

  visualizar(tecnico: any) {
    this.tecnicoSelecionado = tecnico;
  }

  fecharModal() {
    this.tecnicoSelecionado = null;
  }

  formatarClasse(valor: string): string {
    return valor.toLowerCase().replace(/\s/g, '-');
  }

  filtrar() {
  // A lógica já está aplicada automaticamente via tecnicosFiltrados().
  // Este método pode ser usado para ações futuras (como paginação).
  }

  limpar() {
    this.filtro = {
      nome: '',
      especialidade: '',
      setor: '',
      disponibilidade: ''
    };
  }

}
