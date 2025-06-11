import { Routes } from '@angular/router';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { CadastroComponent } from './ordem-servico/cadastro/cadastro.component';
import { ListaComponent } from './ordem-servico/lista/lista.component';

export const MECANICA_ROUTES: Routes = [
  { path: 'equipamentos', component: EquipamentosComponent },
  { path: 'tecnicos', component: TecnicosComponent },
  { path: 'prontuario', component: ProntuarioComponent },
  {
    path: 'ordemservico',
    children: [
      { path: 'cadastro', component: CadastroComponent },
      { path: 'lista', component: ListaComponent },
    ],
  },
];
