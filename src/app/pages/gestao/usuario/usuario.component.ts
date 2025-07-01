// src/app/pages/usuario/usuario.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, CreateUserPayload } from '../../../core/services/user.service';
import { ToastComponent } from 'app/components/toast/toast.component';
import { ViewChild } from '@angular/core';
import { HttpErrorResponse }   from '@angular/common/http';
import { LoadingComponent } from 'app/shared/loading/loading.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent, LoadingComponent],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent {
  @ViewChild(ToastComponent, { static: true }) toast!: ToastComponent;

  // campos do formulário
  nome = '';
  sobrenome = '';
  email = '';
  senha = '';

  // opções de tipos de acesso e seleção
  acessosDisponiveis = ['MECANICA', 'PRODUCAO', 'LOGISTICA', 'GESTAO'];
  acessosSelecionados: string[] = [];

  // flag de carregamento
  isLoading = false;

  constructor(private userService: UserService) {}

  /** marca/desmarca um acesso selecionado */
  toggleAcesso(acesso: string): void {
    const idx = this.acessosSelecionados.indexOf(acesso);
    if (idx > -1) {
      this.acessosSelecionados.splice(idx, 1);
    } else {
      this.acessosSelecionados.push(acesso);
    }
  }

  /** envia dados ao backend para criar usuário */
  cadastrar(): void {
    if (!this.nome || !this.sobrenome || !this.email || !this.senha || this.acessosSelecionados.length === 0) {
      this.toast.show('Preencha todos os campos!', 'warning');
      return;
    }

    const payload: CreateUserPayload = {
      name: `${this.nome} ${this.sobrenome}`,
      email: this.email,
      password: this.senha,
      firstName: this.nome,
      lastName: this.sobrenome,
      types: this.acessosSelecionados,
    };

    this.isLoading = true;
    this.userService.createUser(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.toast.show('Usuário criado com sucesso!', 'success');
        this.resetForm();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        // tenta extrair a mensagem do body => { message: "..." }
        const msg = err.error?.message || 'Erro inesperado. Tente novamente.';
        console.error('Erro ao criar usuário', err);
        this.toast.show(msg, 'error');
      }
    });
  }

  /** limpa os campos do formulário */
  private resetForm(): void {
    this.nome = '';
    this.sobrenome = '';
    this.email = '';
    this.senha = '';
    this.acessosSelecionados = [];
  }
}
