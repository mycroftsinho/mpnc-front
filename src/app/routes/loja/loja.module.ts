import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../../shared/shared.module';
import { AlterarComponent } from './alterar/alterar.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
   { path: 'alterar', component: AlterarComponent },
   { path: 'listar', component: ListarComponent }
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
    ]
})
export class LojaModule { }
