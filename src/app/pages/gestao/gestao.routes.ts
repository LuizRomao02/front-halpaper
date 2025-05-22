import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminListComponent } from './admin/list/admin-list.component';

import { EstruturaOrganizacionalComponent } from './estrutura-organizacional/estrutura-organizacional.component';
import { PerfisAcessoComponent } from './perfis-acesso/perfis-acesso.component';

export const GESTAO_ROUTES: Routes = [
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },             // /gestao/admin
      { path: 'list', component: AdminListComponent },     // /gestao/admin/list
    ],
  },
  { path: 'estrutura', component: EstruturaOrganizacionalComponent },
  { path: 'perfis', component: PerfisAcessoComponent }
];
