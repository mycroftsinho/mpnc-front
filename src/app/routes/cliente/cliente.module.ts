import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../../shared/shared.module';
import { CadastrarComponent } from './cadastrar/cadastrar.component';

const routes: Routes = [
    { path: 'cadastro', component: CadastrarComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CustomFormsModule,
        FileUploadModule,
    ],
    declarations: [
        CadastrarComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ClienteModule { }
