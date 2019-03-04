import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) { }

    CadastroDeMotorista() {
        this.router.navigate(['/cadastro/motorista']);
    }

    AprovarCadastro() {
        this.router.navigate(['/cadastro/listarCadastrosPendentes']);
    }

    ManterCategoria() {
        this.router.navigate(['/categoria']);
    }

    ManterMercadoria() {
        this.router.navigate(['/mercadoria']);
    }

    ngOnInit() {
    }

}
