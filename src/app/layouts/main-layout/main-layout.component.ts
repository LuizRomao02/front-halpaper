import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

interface MenuItem { label: string; icon: string; route?: string; children?: MenuItem[]; }

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isSidebarCollapsed = false;
  sistemaCarregado = false;
  microsservicoAtual = '';
  submenuAberto: string | null = null;
  sections: string[] = [];

  menus: Record<string, MenuItem[]> = {
    GESTAO: [
      {
        label: 'Usuários', icon: '👥', children: [
          { label: 'Cadastrar', icon: '➕', route: '/gestao/usuario' },
          { label: 'Listar',   icon: '📄', route: '/gestao/usuario/usuario-list' }
        ]
      },
      {
        label: 'Estrutura Org.', icon: '🏛️', children: [
          { label: 'Cadastrar', icon: '➕', route: '/gestao/estrutura' },
          { label: 'Listar',   icon: '📄', route: '/gestao/estrutura/list' }
        ]
      }
    ],
    MECANICA: [
      { label: 'Dashboard', icon: '📊', route: '/mecanica/dashboard' },
      {
        label: 'Ordem de Serviço', icon: '📝', children: [
          { label: 'Cadastrar', icon: '➕', route: '/mecanica/ordemservico/cadastro' },
          { label: 'Listar',   icon: '📄', route: '/mecanica/ordemservico/lista' }
        ]
      },
      {
        label: 'Equipamentos', icon: '⚙️', children: [
          { label: 'Cadastrar', icon: '➕', route: '/mecanica/equipamentos/cadastro' },
          { label: 'Listar',   icon: '📄', route: '/mecanica/equipamentos/lista' }
        ]
      },
      {
        label: 'Técnicos', icon: '👨‍🔧', children: [
          { label: 'Cadastrar', icon: '➕', route: '/mecanica/tecnicos/cadastro' },
          { label: 'Listar',   icon: '📄', route: '/mecanica/tecnicos/lista' }
        ]
      },
      {
        label: 'Prontuário', icon: '📁', children: [
          { label: 'Técnico',    icon: '👨‍🔧', route: '/mecanica/prontuario/tecnico' },
          { label: 'Equipamento', icon: '⚙️', route: '/mecanica/prontuario/equipamento' }
        ]
      }
    ],
    LOGISTICA: [
      { label: 'Peças e Estoque', icon: '📦', route: '/logistica/pecas' }
    ],
    PRODUCAO: [
      { label: 'Acompanhamento', icon: '📈', route: '/producao/acompanhamento' }
    ]
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.auth.getRoles$()
          .pipe(filter(r => r.length > 0), take(1))
          .subscribe(roles => {
            this.sections = roles
              .map(r => r.replace(/^ROLE_/, '').toUpperCase())
              .filter(s => !!this.menus[s]);

            // define sistema atual a partir do storage ou primeiro disponível
            this.microsservicoAtual = (
              localStorage.getItem('sistemaSelecionado') || this.sections[0] || ''
            ).toUpperCase();

            this.sistemaCarregado = true;

            // navegação inicial
            if (this.router.url === '/' || this.router.url === '') {
              this.router.navigate([`/${this.microsservicoAtual.toLowerCase()}`]);
            }
          });
      }, 0);
    }
  }

  /** getters */
  get menuAtual(): MenuItem[] {
    return this.menus[this.microsservicoAtual] || [];
  }

  /** Seleciona um microsserviço pelo nome e atualiza o menu */
  selecionarSistema(s: string): void {
    this.microsservicoAtual = s;
    localStorage.setItem('sistemaSelecionado', s);
    this.submenuAberto = null;
    this.router.navigate([`/${s.toLowerCase()}`]);
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleSubmenu(label: string): void {
    this.submenuAberto = this.submenuAberto === label ? null : label;
  }

  logout(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
