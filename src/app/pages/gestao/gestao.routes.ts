import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminListComponent } from './admin/list/admin-list.component';

import { EstruturaOrganizacionalComponent } from './estrutura-organizacional/estrutura-organizacional.component';
import { EstruturaOrganizacionalListComponent } from './estrutura-organizacional/list/estrutura-organizacional-list.component';
import { PerfisAcessoComponent } from './perfis-acesso/perfis-acesso.component';

export const GESTAO_ROUTES: Routes = [
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent }, // /gestao/admin
      { path: 'list', component: AdminListComponent }, // /gestao/admin/list
    ],
  },
  {
    path: 'estrutura',
    children: [
      { path: '', component: EstruturaOrganizacionalComponent }, // /gestao/estrutura
      { path: 'list', component: EstruturaOrganizacionalListComponent }, // /gestao/estrutura/list
    ],
  },
  { path: 'perfis', component: PerfisAcessoComponent },
];
