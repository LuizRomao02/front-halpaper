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
        path: 'admin',
        loadComponent: () =>
          import('./pages/admin/admin.component').then((m) => m.AdminComponent),
      },
      {
        path: 'cadastro/equipamentos',
        loadComponent: () =>
          import('./pages/equipamentos/equipamentos.component').then(
            (m) => m.EquipamentosComponent
          ),
      },
      // Adicione mais rotas aqui conforme for criando as telas
    ],
  },
];
