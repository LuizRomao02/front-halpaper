import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'gestao/admin',
        pathMatch: 'full',
      },
      {
        path: 'gestao',
        loadChildren: () =>
          import('./pages/gestao/gestao.routes').then((m) => m.GESTAO_ROUTES),
      },
      {
        path: 'mecanica',
        loadChildren: () =>
          import('./pages/mecanica/mecanica.routes').then(
            (m) => m.MECANICA_ROUTES
          ),
      },
      {
        path: 'logistica',
        loadChildren: () =>
          import('./pages/logistica/logistica.routes').then(
            (m) => m.LOGISTICA_ROUTES
          ),
      },
      {
        path: 'producao',
        loadChildren: () =>
          import('./pages/producao/producao.routes').then(
            (m) => m.PRODUCAO_ROUTES
          ),
      },
    ],
  },
];
