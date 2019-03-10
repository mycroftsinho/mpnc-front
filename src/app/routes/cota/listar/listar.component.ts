import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CotaService } from '../../../services/cota/CotaService';
import { CotasRequest } from '../../../services/models/CotasRequest';

const swal = require('sweetalert');

@Component({
    selector: 'app-listar',
    templateUrl: './listar.component.html',
    styleUrls: ['./listar.component.scss'],
    providers: [CotaService]
})

export class ListarComponent implements OnInit {

    cadastros: any = [];

    constructor(private service: CotaService, private router: Router) {}

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
        this.router.navigate(['/cota/definir'],
            {
                queryParams: {
                    lojaId: cadastro.lojaId,
                    quantidade: cadastro.quantidade
                }
            });
    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }

}
