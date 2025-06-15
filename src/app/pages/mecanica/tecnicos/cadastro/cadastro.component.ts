import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastComponent } from 'app/components/toast/toast.component';

@Component({
  selector: 'app-cadastro-tecnico',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroTecComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  tecnico = {
    nomeCompleto: '',
    matricula: '',
    especialidade: '',
    setor: '',
    disponibilidade: '',
    certificacoes: ''
  };

  cadastrar(form: NgForm) {
    console.log('Técnico cadastrado:', this.tecnico);

    //envio para o bkacend
    this.toast.show('Técnico cadastrado com sucesso!');
    form.resetForm();
  }
}
