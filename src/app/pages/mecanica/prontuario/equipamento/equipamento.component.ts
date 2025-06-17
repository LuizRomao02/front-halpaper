import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prontuario-equipamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.scss']
})
export class ProntuarioEquipamentoComponent {
  equipamentoSelecionado: any = null;

  filtro = {
    nome: '',
    codigo: '',
    setor: '',
    vidaUtil: 0
  };

  setores = ['Produção', 'Manutenção', 'Qualidade'];

  equipamentos = [
    {
      nome: 'Compressor de Ar',
      codigo: 'EQP001',
      setor: 'Manutenção',
      localizacao: 'Galpão 3',
      vidaUtil: 80,
      descricao: 'Equipamento usado para compressão de ar em linhas pneumáticas.'
    },
    {
      nome: 'Esteira Transportadora',
      codigo: 'EQP002',
      setor: 'Produção',
      localizacao: 'Linha A',
      vidaUtil: 55,
      descricao: 'Responsável pelo transporte de peças entre estações.'
    },
    {
      nome: 'Sensor Óptico',
      codigo: 'EQP003',
      setor: 'Qualidade',
      localizacao: 'Estação de verificação',
      vidaUtil: 30,
      descricao: 'Detecta falhas visuais em peças com alta precisão.'
    }
  ];

  equipamentosFiltrados() {
    return this.equipamentos.filter(eq =>
      eq.nome.toLowerCase().includes(this.filtro.nome.toLowerCase()) &&
      eq.codigo.toLowerCase().includes(this.filtro.codigo.toLowerCase()) &&
      (!this.filtro.setor || eq.setor === this.filtro.setor) &&
      eq.vidaUtil >= this.filtro.vidaUtil
    );
  }

  visualizar(eq: any) {
    this.equipamentoSelecionado = eq;
  }

  fecharModal() {
    this.equipamentoSelecionado = null;
  }

  filtrar() {
    // Se necessário, ações extras podem ser adicionadas aqui.
  }

  limpar() {
    this.filtro = {
      nome: '',
      codigo: '',
      setor: '',
      vidaUtil: 0
    };
  }
}
