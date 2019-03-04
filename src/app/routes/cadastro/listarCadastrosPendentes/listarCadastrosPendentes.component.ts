import { Component, OnInit } from '@angular/core';
import { CadastroService, AprovacaoRequest } from '../../../services/cadastro/CadastroService';
import { Router } from '@angular/router';

const swal = require('sweetalert');

@Component({
    selector: 'app-listarcadastros',
    templateUrl: './listarCadastrosPendentes.component.html',
    styleUrls: ['./listarCadastrosPendentes.component.scss'],
    providers: [CadastroService]
})

export class ListarCadastrosPendentesComponent implements OnInit {

    cadastros: any = [];

    constructor(private service: CadastroService, private router: Router) { }


    ngOnInit() {
        this.BuscarCadastros();
    }

    IrParaVisualizacao(id: string, email: string) {
        this.router.navigate(['/cadastro/visualizar'],
            {
                queryParams: {
                    'id': id,
                    'email': email,
                }
            });
    }

    BuscarCadastros() {
        this.cadastros = [];
        this.service.BuscarCadastrosPendentes().subscribe((data: {}) => {
            console.log(data);
            this.cadastros = data;
        });
    }

    AprovarCadastro(aprovacao: boolean, cadastro: any) {
        let obj: AprovacaoRequest = new AprovacaoRequest();
        obj.Email = cadastro.email;
        obj.MotoristaId = cadastro.motoristaId;
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
