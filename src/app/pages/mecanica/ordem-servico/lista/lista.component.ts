import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface
interface OrdemServico {
  data: string;
  setor: string;
  solicitante: string;
  equipamento: string;
  motivo: string;
  recebidoPor: string;
  tecnico: string;
  tipoManutencao: string;
  descricao: string;
  material: string;
  maoDeObra: string;
  tempoPrevisto: number;
  tempoUtilizado: number;
  dataFinal: string;
  assinatura: string;
  status: string;
}

@Component({
  selector: 'app-ordem-servico-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaOsComponent {
  ordemSelecionada: OrdemServico | null = null;
  ordemParaAtualizar: OrdemServico | null = null;

  statusProximos = [
    'Novo',
    'Em andamento',
    'Validação',
    'Concluído'
  ];

  filtros = {
    data: '',
    setor: '',
    solicitante: '',
    equipamento: '',
    tecnico: '',
    tipoManutencao: '',
    tempoPrevisto: '',
    dataFinal: '',
    status: ''
  };

  statusEtapas = ['Novo', 'Em andamento', 'Validação', 'Concluído', 'Teste de produção'];

  ordensFiltradas: OrdemServico[] = [
    {
      data: '2025-06-10',
      setor: 'Manutenção',
      solicitante: 'Carlos Silva',
      equipamento: 'Compressor ABC123',
      motivo: 'Superaquecimento',
      recebidoPor: 'Ricardo Almeida',
      tecnico: 'João Mendes',
      tipoManutencao: 'Corretiva',
      descricao: 'Substituição de válvula térmica.',
      material: 'Válvula nova, tubo de cobre',
      maoDeObra: '2 técnicos',
      tempoPrevisto: 3,
      tempoUtilizado: 2,
      dataFinal: '2025-06-11',
      assinatura: 'Carlos Silva',
      status: 'Novo'
    },
    {
      data: '2025-06-09',
      setor: 'Produção',
      solicitante: 'Ana Souza',
      equipamento: 'Esteira XYZ',
      motivo: 'Manutenção preventiva mensal',
      recebidoPor: 'Juliana Costa',
      tecnico: 'Maria Oliveira',
      tipoManutencao: 'Preventiva',
      descricao: 'Lubrificação e checagem dos motores.',
      material: 'Óleo lubrificante, pano técnico',
      maoDeObra: '1 técnico',
      tempoPrevisto: 2,
      tempoUtilizado: 2,
      dataFinal: '2025-06-10',
      assinatura: 'Ana Souza',
      status: 'Novo'
    }
  ];

  filtrar() {
    console.log('Filtros aplicados:', this.filtros);
  }

  limpar() {
    this.filtros = {
      data: '',
      setor: '',
      solicitante: '',
      equipamento: '',
      tecnico: '',
      tipoManutencao: '',
      tempoPrevisto: '',
      dataFinal: '',
      status: ''
    };
  }

  editar(ordem: OrdemServico) {
    console.log('Editar:', ordem);
  }

  excluir(ordem: OrdemServico) {
    console.log('Excluir:', ordem);
  }

  visualizar(ordem: OrdemServico) {
    this.ordemSelecionada = ordem;
  }

  fecharVisualizacao() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.classList.add('hide');
      setTimeout(() => {
        this.ordemSelecionada = null;
      }, 300);
    } else {
      this.ordemSelecionada = null;
    }
  }

  imprimir(ordem: OrdemServico) {
    const campos = [
      "Data", "Setor", "Solicitante", "Equipamento", "Motivo", "Recebido por",
      "Técnico Responsável", "Tipo de Manutenção", "Descrição do Serviço", "Material Utilizado",
      "Mão de Obra", "Tempo Previsto (h)", "Tempo Utilizado (h)", "Data Final", "Assinatura", "Status"
    ];

    const chaves = [
      "data", "setor", "solicitante", "equipamento", "motivo", "recebidoPor",
      "tecnico", "tipoManutencao", "descricao", "material",
      "maoDeObra", "tempoPrevisto", "tempoUtilizado", "dataFinal", "assinatura", "status"
    ];

    fetch('assets/templates/impressao-os.html')
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
              <td>${this.formatarDado(ordem[chaves[i] as keyof OrdemServico], chaves[i])}</td>
            </tr>`).join('');

          const logo = win.document.querySelector("img");
          if (logo && !logo.complete) {
            logo.onload = () => win.print();
          } else {
            win.print();
          }
        };
      });
  }

  formatarDado(valor: any, campo: string): string {
    if (["data", "dataFinal"].includes(campo) && valor) {
      return new Date(valor).toLocaleDateString('pt-BR');
    }
    return valor ?? '';
  }

  confirmarAtualizacaoStatus(ordem: OrdemServico) {
    this.ordemParaAtualizar = ordem;
  }

  fecharModalStatus() {
    this.ordemParaAtualizar = null;
  }

  atualizarStatus() {
    if (!this.ordemParaAtualizar) return;

    const index = this.statusProximos.indexOf(this.ordemParaAtualizar.status);
    if (index !== -1 && index < this.statusProximos.length - 1) {
      this.ordemParaAtualizar.status = this.statusProximos[index + 1];
    }

    this.fecharModalStatus();
  }
}
