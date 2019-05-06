import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LojaService } from '../../services/LojaService';

@Component({
    selector: 'app-listarloja',
    templateUrl: './listarloja.component.html',
    styleUrls: ['./listarloja.component.scss'],
    providers: [LojaService]
})

export class ListarLojaComponent implements OnInit {

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
                    alert('Falha no envio da resposta!');
                } else if (err.status === 505) {
                    alert('Erro na validação dos dados!');
                } else {
                    alert('Erro na comunicação com o servidor, tente mais tarde!');
                }
            });
    }

    RemoverItemDaLista(cadastro: any) {
        const index = this.cadastros.indexOf(cadastro);
        if (index !== -1) {
            this.cadastros.splice(index, 1);
        }
    }

}
