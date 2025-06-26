// src/app/layouts/main-layout/main-layout.component.ts
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';
import {
  RouterModule,
  RouterOutlet,
  Router
} from '@angular/router';
import { filter, take } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

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
  isSidebarCollapsed   = false;
  sistemaCarregado     = false;
  microsservicoAtual   = '';
  submenuAberto: string | null = null;

  /** só estas sections para as quais o usuário tem roles */
  sections: string[] = [];

  /** configurações de menu para cada sistema */
  menus: Record<string, MenuItem[]> = {
    GESTAO: [
      {
        label: 'Usuários',
        icon: '👥',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/gestao/admin' },
          { label: 'Listar',    icon: '📄', route: '/gestao/admin/list' },
        ],
      },
      {
        label: 'Estrutura Org.',
        icon: '🏛️',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/gestao/estrutura' },
          { label: 'Listar',    icon: '📄', route: '/gestao/estrutura/list' },
        ],
      }
    ],
    MECANICA: [
      { label: 'Dashboard', icon: '📊', route: '/mecanica/dashboard' },
      {
        label: 'Ordem de Serviço',
        icon: '📝',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/mecanica/ordemservico/cadastro' },
          { label: 'Listar',    icon: '📄', route: '/mecanica/ordemservico/lista' },
        ],
      },
      {
        label: 'Equipamentos',
        icon: '⚙️',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/mecanica/equipamentos/cadastro' },
          { label: 'Listar',    icon: '📄', route: '/mecanica/equipamentos/lista' },
        ],
      },
      {
        label: 'Técnicos',
        icon: '👨‍🔧',
        children: [
          { label: 'Cadastrar', icon: '➕', route: '/mecanica/tecnicos/cadastro' },
          { label: 'Listar',    icon: '📄', route: '/mecanica/tecnicos/lista' },
        ],
      },
      {
        label: 'Prontuário',
        icon: '📁',
        children: [
          { label: 'Técnico',    icon: '👨‍🔧', route: '/mecanica/prontuario/tecnico' },
          { label: 'Equipamento',icon: '⚙️', route: '/mecanica/prontuario/equipamento' },
        ],
      },
    ],
    LOGISTICA: [
      { label: 'Peças e Estoque', icon: '📦', route: '/logistica/pecas' },
    ],
    PRODUCAO: [
      { label: 'Acompanhamento', icon: '📈', route: '/producao/acompanhamento' },
    ]
  };

  constructor(
    private router: Router,
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.getRoles$()
        .pipe(
          filter(roles => roles.length > 0), // espera ao menos 1 role
          take(1)
        )
        .subscribe(roles => {
          this.sections = roles
            .map(r => r.replace(/^ROLE_/, '').toUpperCase())
            .filter(s => !!this.menus[s]);

          this.microsservicoAtual =
            localStorage.getItem('sistemaSelecionado')?.toUpperCase()
            || this.sections[0]
            || '';

          this.sistemaCarregado = true;
        });
    } else {
      // em SSR apenas habilita o layout sem esperar
      this.sistemaCarregado = true;
    }
  }

  selecionarSistema(sistema: string) {
    this.microsservicoAtual = sistema;
    localStorage.setItem('sistemaSelecionado', sistema);
    switch (sistema) {
      case 'GESTAO':
        this.router.navigate(['/gestao/admin']);
        break;
      case 'MECANICA':
        this.router.navigate(['/mecanica/dashboard']);
        break;
      case 'LOGISTICA':
        this.router.navigate(['/logistica/pecas']);
        break;
      case 'PRODUCAO':
        this.router.navigate(['/producao/acompanhamento']);
        break;
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleSubmenu(label: string) {
    this.submenuAberto = this.submenuAberto === label ? null : label;
  }

  /** retorna só o menu do sistema ativo */
  get menuAtual(): MenuItem[] {
    return this.menus[this.microsservicoAtual] || [];
  }

  /** chama o logout e redireciona para /login */
  logout(): void {
    this.auth.logout().subscribe({
      next: () => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('sistemaSelecionado');
        }
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Logout falhou', err);
        // mesmo assim redireciona
        this.router.navigate(['/login']);
      }
    });
  }
}
