import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components/components.component';
import { LoginComponent } from './examples/login/login.component';
import { RegisterComponent } from './examples/register/register.component';
import { ListarCotaComponent } from './examples/listarcota/listarcota.component';
import { DefinirCotaComponent } from './examples/definircota/definircota.component';
import { AprovarCadastroComponent } from './examples/aprovarcadastro/aprovarcadastro.component';
import { SolicitarCadastroComponent } from './examples/solicitarcadastro/solicitarcadastro.component';
import { VisualizarCadastroComponent } from './examples/visualizarcadastro/visualizarcadastro.component';
import { ListarLojaComponent } from './examples/listarloja/listarloja.component';
import { AlterarLojaComponent } from './examples/alterarloja/alterarloja.component';
import { ListaEnderecosComponent } from './examples/listaenderecos/listaenderecos.component';
import { CadastrarEnderecoComponent } from './examples/cadastrarendereco/cadastrarendereco.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'login',                component: LoginComponent },
    { path: 'register',             component: RegisterComponent },
    { path: 'listarCota',           component: ListarCotaComponent },
    { path: 'definircota',          component: DefinirCotaComponent },
    { path: 'aprovarcadastro',      component: AprovarCadastroComponent },
    { path: 'solicitarcadastro',    component: SolicitarCadastroComponent },
    { path: 'visualizarcadastro',   component: VisualizarCadastroComponent },
    { path: 'listarlojas',          component: ListarLojaComponent },
    { path: 'alterarloja',          component: AlterarLojaComponent },
    { path: 'listaenderecos',        component: ListaEnderecosComponent },
    { path: 'cadastrarendereco',        component: CadastrarEnderecoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
