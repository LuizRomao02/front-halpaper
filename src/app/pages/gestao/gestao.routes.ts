import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { EstruturaOrganizacionalComponent } from './estrutura-organizacional/estrutura-organizacional.component';
import { EstruturaOrganizacionalListComponent } from './estrutura-organizacional/list/estrutura-organizacional-list.component';

export const GESTAO_ROUTES: Routes = [
  {
    path: 'usuario',
    children: [
      { path: '', component: UsuarioComponent },
      { path: 'list', component: UsuarioListComponent },
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
