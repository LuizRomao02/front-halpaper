import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ordem-servico-lista',
  standalone: true,
  imports: [CommonModule, FormsModule], // <- Aqui está o FormsModule
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})

export class ListaOsComponent {

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

  ordensFiltradas: any[] = [];

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
}
