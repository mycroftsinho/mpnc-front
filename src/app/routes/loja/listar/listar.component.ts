import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LojaService } from '../../../services/loja/LojaService';

const swal = require('sweetalert');

@Component({
    selector: 'app-listar',
    templateUrl: './listar.component.html',
    styleUrls: ['./listar.component.scss'],
    providers: [LojaService]
})

export class ListarComponent implements OnInit {

    cadastros: any = [];
    constructor(private service: LojaService, private router: Router) { }

    ngOnInit() {
        this.BuscarCadastros();
    }

    BuscarCadastros() {
        this.cadastros = [];
        this.service.BuscarLojas().subscribe((data: any) => {
            console.log(data);
            this.cadastros = data;
        });
    }

    AlterarLoja(cadastro: any) {
        this.router.navigate(['/loja/alterar'],
            {
                queryParams: {
                    lojaId: cadastro.lojaId
                }
            });
    }

    InativarLoja(cadastro: any) {
        const form: any = {
            Id: cadastro.lojaId
        };

        this.service.InativarLoja(form)
            .subscribe((result) => {
                this.RemoverItemDaLista(cadastro);
            }, (err) => {
                if (err.status === 404) {
                    this.sweetalertError('Falha no envio da resposta!');
                } else if (err.status === 505) {
                    this.sweetalertError('Erro na validação dos dados!');
                } else {
                    this.sweetalertError('Erro na comunicação com o servidor, tente mais tarde!');
                }
            });
    }

    RemoverItemDaLista(cadastro: any) {
        const index = this.cadastros.indexOf(cadastro);
        if (index !== -1) {
            this.cadastros.splice(index, 1);
        }
    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }

}
