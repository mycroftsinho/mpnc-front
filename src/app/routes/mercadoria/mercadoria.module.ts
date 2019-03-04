import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';

import { SharedModule } from '../../shared/shared.module';
import { MercadoriaComponent} from './mercadoria/mercadoria.component';
import { NovaComponent} from './nova/nova.component';
import { AlterarComponent} from './alterar/alterar.component';

const routes: Routes = [
    { path: '', component: MercadoriaComponent },
    { path: 'nova', component: NovaComponent },
    { path: 'alterar', component: AlterarComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CustomFormsModule,
    ],
    declarations: [
        MercadoriaComponent,
        AlterarComponent,
        NovaComponent
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class MercadoriaModule { }