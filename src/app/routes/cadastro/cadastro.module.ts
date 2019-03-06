import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../../shared/shared.module';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { PendentesComponent } from './pendentes/pendentes.component';
import { VisualizarComponent } from './visualizar/visualizar.component';

const routes: Routes = [
    { path: 'solicitacao', component: SolicitacaoComponent },
    { path: 'pendentes', component: PendentesComponent },
    { path: 'visualizar', component: VisualizarComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CustomFormsModule,
        FileUploadModule,
    ],
    declarations: [
        SolicitacaoComponent,
        PendentesComponent,
        VisualizarComponent
    ],
    exports: [
        RouterModule
    ]
})
export class CadastroModule { }
