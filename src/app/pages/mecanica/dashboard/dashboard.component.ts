import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totalOS = 120;
  osEmAndamento = 18;
  osConcluidas = 92;
  tempoMedioConclusao = 3.2;
  tecnicosDisponiveis = 5;

  graficoStatus = {
    data: {
      labels: ['Novo', 'Em Andamento', 'Concluído'],
      datasets: [
        {
          data: [10, 18, 92],
          backgroundColor: ['#fdd835', '#ff8f00', '#66bb6a'], // tons mais suaves e elegantes
          hoverBackgroundColor: ['#fbc02d', '#fb8c00', '#43a047'],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#004d40',
            font: {
              size: 13
            }
          }
        }
      }
    } as ChartConfiguration['options']
  };

  graficoVolumeOS = {
    data: {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [
        {
          label: 'OS Criadas',
          data: [15, 22, 30, 18],
          borderColor: '#00796b',
          backgroundColor: 'rgba(0, 150, 136, 0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    } as ChartConfiguration['options']
  };

  equipamentosCriticos = [
    { nome: 'Compressor A', vidaUtil: 12 },
    { nome: 'Esteira B', vidaUtil: 8 }
  ];

  rankingTecnicos = [
    { nome: 'João Silva', qtdOS: 25, tempoMedio: 2.8 },
    { nome: 'Ana Souza', qtdOS: 20, tempoMedio: 3.1 },
    { nome: 'Carlos Lima', qtdOS: 18, tempoMedio: 3.5 }
  ];

  ultimasOS = [
    { data: '16/05/2025', setor: 'Produção', equipamento: 'Motor X', tecnico: 'João Silva', status: 'Concluído' },
    { data: '14/05/2025', setor: 'Manutenção', equipamento: 'Compressor A', tecnico: 'Ana Souza', status: 'Em Andamento' },
    { data: '13/05/2025', setor: 'Logística', equipamento: 'Esteira B', tecnico: 'Carlos Lima', status: 'Novo' }
  ];
}
