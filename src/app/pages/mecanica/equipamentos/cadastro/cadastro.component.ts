import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ToastComponent } from 'app/components/toast/toast.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro-equipamento',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})

export class CadastroEqComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  equipamento = {
    nome: '',
    codigo: '',
    setor: '',
    descricao: '',
    dataAquisicao: '',
    vidaUtilEmAnos: 0
  };


  cadastrar(form: NgForm) {
    console.log('Equipamento salvo:', this.equipamento);

    // Aqui você pode enviar para o backend futuramente
    this.toast.show('Cadastro realizado com sucesso!');
    form.resetForm(); // <- reseta todos os campos do formulário
  }
}
