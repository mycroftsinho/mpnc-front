import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/models/AuthGuard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class HomeModule { }
