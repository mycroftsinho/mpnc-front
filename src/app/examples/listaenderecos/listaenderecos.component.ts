import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../../services/EnderecoService';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-listaenderecos',
    templateUrl: './listaenderecos.component.html',
    styleUrls: ['./listaenderecos.component.scss'],
    providers: [EnderecoService]
})

export class ListaEnderecosComponent implements OnInit {
    cadastros: any = [];
    possuiCadastros: boolean = false;

    constructor(private service: EnderecoService, private router: Router, private sanitizer: DomSanitizer) {
        const email = localStorage.getItem('application-infouser');
        this.BuscarCadastros(email);
    }

    ngOnInit() {

    }

    BuscarCadastros(email) {
        this.cadastros = [];
        this.service.BuscarEnderecos(email).subscribe((data: any) => {
            console.log(data);
            this.cadastros = data;
            this.possuiCadastros = this.cadastros.lenght > 0;

            for (let i = 0, len = this.cadastros.length; i < len; i++) {
                this.cadastros[i].showImage = this.sanitizer.bypassSecurityTrustUrl('data:Image/*;base64,' + this.cadastros[i].imagem);
            }
        });
    }

    CadastrarEndereco() {
        this.router.navigate(['/cadastrarendereco']);
    }

    RemoverEndereco(cadastro: any) {
        const form: any = {
            Id: cadastro.id
        };

        this.service.RemoverEndereco(form)
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
