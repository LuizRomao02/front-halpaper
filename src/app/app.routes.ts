import { Routes } from '@angular/router';
import { LoginComponent }      from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard }           from './core/auth/auth.guard';
import { loginGuard }          from './core/auth/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ loginGuard ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [ authGuard ],
    children: [
      { path: '', redirectTo: 'gestao/admin', pathMatch: 'full' },
      { path: 'gestao',   loadChildren: () => import('./pages/gestao/gestao.routes').then(m => m.GESTAO_ROUTES) },
      { path: 'mecanica', loadChildren: () => import('./pages/mecanica/mecanica.routes').then(m => m.MECANICA_ROUTES) },
      { path: 'logistica',loadChildren: () => import('./pages/logistica/logistica.routes').then(m => m.LOGISTICA_ROUTES) },
      { path: 'producao', loadChildren: () => import('./pages/producao/producao.routes').then(m => m.PRODUCAO_ROUTES) },
    ]
  }
];
