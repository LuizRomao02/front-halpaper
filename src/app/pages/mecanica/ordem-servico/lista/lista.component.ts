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
  nomeExecutor: string;
  tipoManutencao: string;
  descricao: string;
  material: string;
  maoDeObra: string;
  tempoPrevisto: number;
  tempoUtilizado: number;
  dataFinal: string;
  assinatura: string;
}

@Component({
  selector: 'app-ordem-servico-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})

export class ListaComponent {
  ordemSelecionada: any = null;

  filtros = {
    data: '',
    setor: '',
    solicitante: '',
    equipamento: '',
    nomeExecutor: '',
    tipoManutencao: '',
    tempoPrevisto: '',
    dataFinal: ''
  };

  ordensFiltradas: OrdemServico[] = [
    {
      data: '10/06/2025',
      setor: 'Manutenção',
      solicitante: 'Carlos Silva',
      equipamento: 'Compressor ABC123',
      motivo: 'Superaquecimento',
      recebidoPor: 'Ricardo Almeida',
      nomeExecutor: 'João Mendes',
      tipoManutencao: 'Corretiva',
      descricao: 'Substituição de válvula térmica.',
      material: 'Válvula nova, tubo de cobre',
      maoDeObra: '2 técnicos',
      tempoPrevisto: 3,
      tempoUtilizado: 2,
      dataFinal: '10/06/2025',
      assinatura: 'Carlos Silva'
    },
    {
      data: '10/06/2025',
      setor: 'Produção',
      solicitante: 'Ana Souza',
      equipamento: 'Esteira XYZ',
      motivo: 'Manutenção preventiva mensal',
      recebidoPor: 'Juliana Costa',
      nomeExecutor: 'Maria Oliveira',
      tipoManutencao: 'Preventiva',
      descricao: 'Lubrificação e checagem dos motores.',
      material: 'Óleo lubrificante, pano técnico',
      maoDeObra: '1 técnico',
      tempoPrevisto: 2,
      tempoUtilizado: 2,
      dataFinal: '10/06/2025',
      assinatura: 'Ana Souza'
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
      nomeExecutor: '',
      tipoManutencao: '',
      tempoPrevisto: '',
      dataFinal: ''
    };
  }

  editar(ordem: OrdemServico) {
    console.log('Editar:', ordem);
  }

  excluir(ordem: OrdemServico) {
    console.log('Excluir:', ordem);
  }

  visualizar(ordem: any) {
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

  imprimir(ordem: any) {
    const campos = [
      "Data", "Setor", "Solicitante", "Equipamento", "Motivo", "Recebido por",
      "Nome do Executor", "Tipo de Manutenção", "Descrição do Serviço", "Material Utilizado",
      "Mão de Obra", "Tempo Previsto (h)", "Tempo Utilizado (h)", "Data Final", "Assinatura"
    ];

    const chaves = [
      "data", "setor", "solicitante", "equipamento", "motivo", "recebidoPor",
      "nomeExecutor", "tipoManutencao", "descricao", "material",
      "maoDeObra", "tempoPrevisto", "tempoUtilizado", "dataFinal", "assinatura"
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
              <td>${this.formatarDado(ordem[chaves[i]], chaves[i])}</td>
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
}
