import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    CadastroDaLoja() {
        this.router.navigate(['/cadastro/solicitacao']);
    }

    AprovarCadastro() {
        this.router.navigate(['/cadastro/pendentes']);
    }

    DefinirCota() {
        this.router.navigate(['/cota/listar']);
    }

}
