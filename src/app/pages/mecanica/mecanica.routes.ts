import { Routes } from '@angular/router';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { CadastroOsComponent } from './ordem-servico/cadastro/cadastro.component';
import { ListaOsComponent } from './ordem-servico/lista/lista.component';
import { CadastroEqComponent } from './equipamentos/cadastro/cadastro.component';
import { ListaEqComponent } from './equipamentos/lista/lista.component';
import { CadastroTecComponent } from './tecnicos/cadastro/cadastro.component';
import { ListaTecComponent } from './tecnicos/lista/lista.component';

export const MECANICA_ROUTES: Routes = [
  { path: 'prontuario', component: ProntuarioComponent },
  {
    path: 'ordemservico',
    children: [
      { path: 'cadastro', component: CadastroOsComponent },
      { path: 'lista', component: ListaOsComponent },
    ],
  },
  {
    path: 'equipamentos',
    children: [
      { path: 'cadastro', component: CadastroEqComponent },
      { path: 'lista', component: ListaEqComponent },
    ],
  },
  {
    path: 'tecnicos',
    children: [
      { path: 'cadastro', component: CadastroTecComponent },
      { path: 'lista', component: ListaTecComponent },
    ],
  },
];
