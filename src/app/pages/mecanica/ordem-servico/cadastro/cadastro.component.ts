import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ToastComponent } from 'app/components/toast/toast.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  ordemServico = {
    data: '',
    setor: '',
    solicitante: '',
    equipamento: '',
    motivo: '',
    recebidoPor: '',
    nomeExecutor: '',
    tipoManutencao: '',
    descricao: '',
    material: '',
    maoDeObra: '',
    tempoPrevisto: null,
    tempoUtilizado: null,
    dataFinal: '',
    assinatura: ''
  };

  cadastrar(form: NgForm) {
    console.log('Ordem de Serviço cadastrada:', this.ordemServico);

    // Aqui você pode enviar para o backend futuramente
    this.toast.show('Cadastro realizado com sucesso!');
    form.resetForm(); // <- reseta todos os campos do formulário
  }
}
