import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxSelectModule } from 'ngx-select-ex';
import { AuthGuard } from '../../services/models/AuthGuard';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NgxSelectModule
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class HomeModule { }
