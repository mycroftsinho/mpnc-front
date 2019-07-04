import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AgmCoreModule } from '@agm/core';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamplesComponent } from './examples.component';
import { ListarCotaComponent } from './listarcota/listarcota.component';
import { DefinirCotaComponent } from './definircota/definircota.component';
import { AprovarCadastroComponent } from './aprovarcadastro/aprovarcadastro.component';
import { SolicitarCadastroComponent } from './solicitarcadastro/solicitarcadastro.component';
import { VisualizarCadastroComponent } from './visualizarcadastro/visualizarcadastro.component';
import { ListarLojaComponent } from './listarloja/listarloja.component';
import { AlterarLojaComponent } from './alterarloja/alterarloja.component';
import { ListaEnderecosComponent } from './listaenderecos/listaenderecos.component';
import { CadastrarEnderecoComponent } from './cadastrarendereco/cadastrarendereco.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_KEY_HERE'
        })
    ],
    declarations: [
        LandingComponent,
        LoginComponent,
        RegisterComponent,
        ExamplesComponent,
        ProfileComponent,
        ListarCotaComponent,
        DefinirCotaComponent,
        AprovarCadastroComponent,
        SolicitarCadastroComponent,
        VisualizarCadastroComponent,
        ListarLojaComponent,
        AlterarLojaComponent,
        ListaEnderecosComponent,
        CadastrarEnderecoComponent
    ]
})
export class ExamplesModule { }
