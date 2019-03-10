import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../../shared/shared.module';
import { DefinirComponent } from './definir/definir.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
    { path: 'definir', component: DefinirComponent },
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
        DefinirComponent,
        ListarComponent
    ],
    exports: [
        RouterModule
    ]
})
export class CotaModule { }
