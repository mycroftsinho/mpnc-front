import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro/CadastroService';
import { AprovacaoRequest } from '../../../services/models/AprovacaoRequest';

const swal = require('sweetalert');

@Component({
    selector: 'app-pendentes',
    templateUrl: './pendentes.component.html',
    styleUrls: ['./pendentes.component.scss'],
    providers: [CadastroService]
})

export class PendentesComponent implements OnInit {

    cadastros: any = [];

    constructor(private service: CadastroService, private router: Router) {}

    ngOnInit() {
        this.BuscarCadastros();
    }

    BuscarCadastros() {
        this.cadastros = [];
        this.service.BuscarCadastrosPendentes().subscribe((data: {}) => {
            console.log(data);
            this.cadastros = data;
        });
    }

    IrParaVisualizacao(nome: string, email: string) {
        this.router.navigate(['/cadastro/visualizar'],
            {
                queryParams: {
                    nome,
                    email,
                }
            });
    }

    AprovarCadastro(aprovacao: boolean, cadastro: any) {
        const obj: AprovacaoRequest = new AprovacaoRequest();
        obj.Email = cadastro.email;
        obj.LojaId = cadastro.lojaId;
        obj.IntencaoDeAprovacao = aprovacao;

        this.service.AprovarCadastroDoMotorista(obj).subscribe((result) => {
            this.RemoverItemDaLista(cadastro);
        }, (err) => {
            console.log('Teste2');
            if (err.status === 404) {
                this.sweetalertError('Falha na aprovação do cadastro!');
            } else if (err.status === 505) {
                this.sweetalertError('Cadastro do motorista inválido!');
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
