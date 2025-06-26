import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminListComponent } from './admin/list/admin-list.component';
import { EstruturaOrganizacionalComponent } from './estrutura-organizacional/estrutura-organizacional.component';
import { EstruturaOrganizacionalListComponent } from './estrutura-organizacional/list/estrutura-organizacional-list.component';

export const GESTAO_ROUTES: Routes = [
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      { path: 'list', component: AdminListComponent },
    ],
  },
  {
    path: 'estrutura',
    children: [
      { path: '', component: EstruturaOrganizacionalComponent },
      { path: 'list', component: EstruturaOrganizacionalListComponent },
    ],
  },
];
