import { UserSummaryDTO, Page, UserDetailsDTO } from './../../../../core/services/user.service';
import { UserService } from 'app/core/services/user.service';
import { LoadingComponent } from './../../../../shared/loading/loading.component';
import { ToastComponent } from 'app/components/toast/toast.component';
import { Component, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { RouterModule }        from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, RouterModule, ToastComponent, LoadingComponent],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent implements OnInit {
  @ViewChild('toast', { static: true }) toast!: ToastComponent;

  filtros = { fullName: '', email: '', username: '' };
  usuarios: UserSummaryDTO[] = [];
  isLoading = false;

  userToDelete?: UserSummaryDTO;

  // detalhes
  rolesOptions : string[] = ['MECANICA', 'PRODUCAO', 'LOGISTICA', 'GESTAO'];
  editingUser?: UserSummaryDTO;
  editRoles: string[] = [];
  isSavingRoles = false;

  selectedUser?: UserDetailsDTO;
  isDetailLoading = false;

  // paginação
  currentPage = 0;
  pageSize = 20;
  totalPages = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = this.currentPage): void {
    this.isLoading = true;
    this.userService.getUsers(this.filtros, page, this.pageSize).subscribe({
      next: (pageData: Page<UserSummaryDTO>) => {
        this.usuarios = pageData.content;
        this.currentPage = pageData.number;
        this.totalPages = pageData.totalPages;
        this.isLoading = false;
      },
      error: err => {
        console.error('Erro ao buscar usuários', err);
        this.toast.show('Falha ao carregar usuários.', 'error');
        this.isLoading = false;
      }
    });
  }

  filtrar(): void {
    this.currentPage = 0;
    this.loadUsers(0);
  }

  limpar(): void {
    this.filtros = { fullName: '', email: '', username: '' };
    this.filtrar();
  }

  visualizar(u: UserSummaryDTO): void {
    this.selectedUser = undefined;
    this.isDetailLoading = true;
    this.userService.getDetails(u.id).subscribe({
      next: details => {
        this.selectedUser = details;
        this.isDetailLoading = false;
      },
      error: err => {
        console.error('Erro ao carregar detalhes', err);
        this.toast.show('Falha ao carregar detalhes.', 'error');
        this.isDetailLoading = false;
      }
    });
  }

  fecharVisualizacao(): void {
    this.selectedUser = undefined;
  }

  editar(u: UserSummaryDTO): void {
    this.openRoleEditor(u);
  }

  openDeleteConfirmation(user: UserSummaryDTO): void {
    this.userToDelete = user;
  }

  /** cancelou a exclusão */
  cancelDelete(): void {
    this.userToDelete = undefined;
  }

  confirmDelete(): void {
    if (!this.userToDelete) { return; }
    this.isLoading = true;
    this.userService.deleteUser(this.userToDelete.id).subscribe({
      next: () => {
        this.toast.show(`Usuário "${this.userToDelete!.fullName}" excluído.`, 'success');
        this.userToDelete = undefined;
        this.loadUsers();    // recarrega a lista
      },
      error: err => {
        console.error('Erro ao excluir usuário', err);
        this.toast.show('Erro ao excluir usuário.', 'error');
        this.isLoading = false;
        this.userToDelete = undefined;
      }
    });
  }

  irParaPagina(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadUsers(page);
    }
  }

  // --- Modal de edição de perfis ---

  openRoleEditor(user: UserSummaryDTO): void {
    this.editingUser = user;
    this.editRoles = [...user.roles];
  }

  onRoleToggle(role: string, checked: boolean): void {
    if (checked) {
      if (!this.editRoles.includes(role)) {
        this.editRoles.push(role);
      }
    } else {
      this.editRoles = this.editRoles.filter(r => r !== role);
    }
  }

  saveRoles(): void {
    if (!this.editingUser) return;
    this.isSavingRoles = true;
    this.userService.updateRoles(this.editingUser.id, this.editRoles).subscribe({
      next: () => {
        this.toast.show('Perfis atualizados com sucesso!', 'success');
        // reflete a mudança na lista
        this.editingUser!.roles = [...this.editRoles];
        this.editingUser = undefined;
        this.isSavingRoles = false;
      },
      error: err => {
        console.error('Falha ao atualizar perfis', err);
        this.toast.show('Falha ao atualizar perfis.', 'error');
        this.isSavingRoles = false;
      }
    });
  }

  cancelEdit(): void {
    this.editingUser = undefined;
  }
}
