import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, // ✅ Necessário para *ngIf e *ngFor
    RouterModule, // ✅ Necessário para routerLink e routerLinkActive
    RouterOutlet, // ✅ Necessário para <router-outlet>
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  isSidebarCollapsed = false;
  sistemaCarregado = false;
  microsservicoAtual = 'MECÂNICA';

  sections = ['MECÂNICA', 'PRODUÇÃO', 'GESTÃO'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedSystem = localStorage.getItem('sistemaSelecionado');
      if (savedSystem && this.sections.includes(savedSystem)) {
        this.microsservicoAtual = savedSystem;
      }
    }

    // Marcar como pronto para renderizar
    this.sistemaCarregado = true;
  }

  selecionarSistema(sistema: string) {
    this.microsservicoAtual = sistema;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sistemaSelecionado', sistema);
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  get menuAtual() {
    return this.menus[this.microsservicoAtual] || [];
  }

  menus: { [key: string]: { label: string; icon: string; route: string }[] } = {
    MECÂNICA: [
      { label: 'Equipamentos', icon: '🛠️', route: '/equipamentos' },
      { label: 'Cadastro', icon: '📋', route: '/cadastro' },
    ],
    PRODUÇÃO: [
      {
        label: 'Acompanhamento',
        icon: '📊',
        route: '/producao/acompanhamento',
      },
    ],
    GESTÃO: [{ label: 'Usuários', icon: '👥', route: '/gestao/usuarios' }],
  };
}
