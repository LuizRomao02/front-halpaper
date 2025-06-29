import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/auth/auth.guard';
import { loginGuard } from './core/auth/login.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'gestao', pathMatch: 'full' },
      { path: 'gestao', loadChildren: () => import('./pages/gestao/gestao.routes').then(m => m.GESTAO_ROUTES), canActivate: [roleGuard], data: { roles: ['ROLE_GESTAO'] } },
      { path: 'mecanica', loadChildren: () => import('./pages/mecanica/mecanica.routes').then(m => m.MECANICA_ROUTES), canActivate: [roleGuard], data: { roles: ['ROLE_MECANICA'] } },
      { path: 'logistica', loadChildren: () => import('./pages/logistica/logistica.routes').then(m => m.LOGISTICA_ROUTES), canActivate: [roleGuard], data: { roles: ['ROLE_LOGISTICA'] } },
      { path: 'producao', loadChildren: () => import('./pages/producao/producao.routes').then(m => m.PRODUCAO_ROUTES), canActivate: [roleGuard], data: { roles: ['ROLE_PRODUCAO'] } },
      { path: '**', redirectTo: 'gestao' }
    ]
  }
];
