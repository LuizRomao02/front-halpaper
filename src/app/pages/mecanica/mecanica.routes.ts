import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { CadastroOsComponent } from './ordem-servico/cadastro/cadastro.component';
import { ListaOsComponent } from './ordem-servico/lista/lista.component';
import { CadastroEqComponent } from './equipamentos/cadastro/cadastro.component';
import { ListaEqComponent } from './equipamentos/lista/lista.component';
import { CadastroTecComponent } from './tecnicos/cadastro/cadastro.component';
import { ListaTecComponent } from './tecnicos/lista/lista.component';
import { ProntuarioEquipamentoComponent } from './prontuario/equipamento/equipamento.component';
import { ProntuarioTecnicoComponent } from './prontuario/tecnico/tecnico.component';

export const MECANICA_ROUTES: Routes = [
  {
    path: 'dashboard', component: DashboardComponent
  },
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
  {
    path: 'prontuario',
    children: [
      { path: 'tecnico', component: ProntuarioTecnicoComponent },
      { path: 'equipamento', component: ProntuarioEquipamentoComponent },
    ],
  }
];
