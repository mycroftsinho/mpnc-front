import { Component, OnInit } from '@angular/core';
import { CotaService } from '../../services/CotaService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listarcota',
    templateUrl: './listarcota.component.html',
    styleUrls: ['./listarcota.component.scss'],
    providers: [CotaService]
})

export class ListarCotaComponent implements OnInit {
    cadastros: any = [];

    constructor(private service: CotaService, private router: Router) { }

    ngOnInit() {
        this.BuscarCadastros();
    }

    BuscarCadastros() {
        this.cadastros = [];
        this.service.BuscarCotas().subscribe((data: any) => {
            console.log(data);
            this.cadastros = data;
        });
    }

    DefinirCota(cadastro: any) {
        this.router.navigate(['/cota/definir'], {
            queryParams: {
                lojaId: cadastro.lojaId,
                quantidade: cadastro.quantidade
            }
        });
    }
}
