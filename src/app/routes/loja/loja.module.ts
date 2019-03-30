import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../../shared/shared.module';
import { AlterarComponent } from './alterar/alterar.component';
import { ListarComponent } from './listar/listar.component';
import { AuthGuard } from '../../services/models/AuthGuard';

const routes: Routes = [
   { path: 'alterar', component: AlterarComponent, canActivate: [AuthGuard] },
   { path: 'listar', component: ListarComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CustomFormsModule,
        FileUploadModule,
    ],
    declarations: [
        AlterarComponent,
        ListarComponent
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class LojaModule { }
