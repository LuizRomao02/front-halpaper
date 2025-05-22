import { Routes } from '@angular/router';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';

export const MECANICA_ROUTES: Routes = [
  { path: 'equipamentos', component: EquipamentosComponent },
  { path: 'tecnicos', component: TecnicosComponent },
  { path: 'prontuario', component: ProntuarioComponent },
];
