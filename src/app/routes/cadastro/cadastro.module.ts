import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../../shared/shared.module';
import { MotoristaComponent } from './motorista/motorista.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { FinalizarCadastroComponent } from './finalizarCadastro/finalizarCadastro.component';
import { ListarCadastrosPendentesComponent } from './listarCadastrosPendentes/listarCadastrosPendentes.component';


const routes: Routes = [
    { path: 'motorista', component: MotoristaComponent },
    { path: 'visualizar', component: VisualizarComponent },
    { path: 'finalizarCadastro', component: FinalizarCadastroComponent },
    { path: 'listarCadastrosPendentes', component: ListarCadastrosPendentesComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CustomFormsModule,
        FileUploadModule,
    ],
    declarations: [
        MotoristaComponent,
        VisualizarComponent,
        FinalizarCadastroComponent,
        ListarCadastrosPendentesComponent
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class CadastroModule { }
