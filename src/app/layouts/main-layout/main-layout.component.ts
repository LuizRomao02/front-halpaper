import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

// ✅ Definindo o tipo com children opcionais
interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})

export class MainLayoutComponent implements OnInit {
  isSidebarCollapsed = false;
  sistemaCarregado = false;
  microsservicoAtual = 'MECÂNICA';
  submenuAberto: string | null = null;

  sections = ['MECÂNICA', 'PRODUÇÃO', 'LOGÍSTICA', 'GESTÃO'];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedSystem = localStorage.getItem('sistemaSelecionado');
      if (savedSystem && this.sections.includes(savedSystem)) {
        this.microsservicoAtual = savedSystem;
      }
    }

    this.sistemaCarregado = true;
  }

  selecionarSistema(sistema: string) {
    this.microsservicoAtual = sistema;
    switch (sistema.toUpperCase()) {
      case 'GESTÃO':
        this.router.navigate(['/gestao/admin']);
        break;
      case 'MECÂNICA':
        this.router.navigate(['/mecanica/dashboard']);
        break;
      case 'LOGÍSTICA':
        this.router.navigate(['/logistica/pecas']);
        break;
      case 'PRODUÇÃO':
        this.router.navigate(['/producao/acompanhamento']);
        break;
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sistemaSelecionado', sistema);
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleSubmenu(label: string) {
    this.submenuAberto = this.submenuAberto === label ? null : label;
  }

  get menuAtual(): MenuItem[] {
    return this.menus[this.microsservicoAtual] || [];
  }

  menus: { [key: string]: MenuItem[] } = {
    GESTÃO: [
      {
        label: 'Usuários',
        icon: '👥',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/gestao/admin' },
          { label: 'Listar', icon: '📄', route: '/gestao/admin/list' },
        ],
      },
      {
        label: 'Estrutura Org.',
        icon: '🏛️',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/gestao/estrutura' },
          { label: 'Listar', icon: '📄', route: '/gestao/estrutura/list' },
        ],
      },
      { label: 'Perfis de Acesso', icon: '🔐', route: '/gestao/perfis' },
    ],

    MECÂNICA: [
      { label: 'Dashboard', icon: '📊', route: '/mecanica/dashboard' },
      {
        label: 'Ordem de Serviço',
        icon: '📝',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/mecanica/ordemservico/cadastro' },
          { label: 'Listar', icon: '📄', route: '/mecanica/ordemservico/lista' },
        ],
      },
      {
        label: 'Equipamentos',
        icon: '⚙️',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/mecanica/equipamentos/cadastro' },
          { label: 'Listar', icon: '📄', route: '/mecanica/equipamentos/lista' },
        ],
      },
      {
        label: 'Técnicos',
        icon: '👨‍🔧',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/mecanica/tecnicos/cadastro' },
          { label: 'Listar', icon: '📄', route: '/mecanica/tecnicos/lista' },
        ],
      },
      {
        label: 'Prontuário',
        icon: '📁',
        children: [
          { label: 'Técnico', icon: '👨‍🔧', route: '/mecanica/prontuario/tecnico' },
          { label: 'Equipamento', icon: '⚙️', route: '/mecanica/prontuario/equipamento' },
        ],
      },
    ],

    LOGÍSTICA: [
      { label: 'Peças e Estoque', icon: '📦', route: '/logistica/pecas' },
    ],

    PRODUÇÃO: [
      { label: 'Acompanhamento', icon: '📈', route: '/producao/acompanhamento' },
    ],
  };
}
