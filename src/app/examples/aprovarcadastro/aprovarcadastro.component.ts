import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from '../../services/CadastroService';
import { AprovacaoRequest } from '../../models/AprocacaoRequest';

@Component({
    selector: 'app-aprovarcadastro',
    templateUrl: './aprovarcadastro.component.html',
    styleUrls: ['./aprovarcadastro.component.scss'],
    providers: [CadastroService]
})

export class AprovarCadastroComponent implements OnInit {

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

    RecusarCadastro(aprovacao: boolean, cadastro: any) {
        if (confirm('Tem certeza que deseja Remover esta solicitação?')) {
            console.log(cadastro);
            this.EnviarSolicitacao(aprovacao, cadastro);
            alert('Solicitação Removida com Sucesso!');
        }
    }

    AprovarCadastro(aprovacao: boolean, cadastro: any) {
        if (confirm('Tem certeza que deseja Aceitar esta solicitação?')) {
            console.log(cadastro);
            this.EnviarSolicitacao(aprovacao, cadastro);
            alert('Solicitação Removida com Sucesso!');
        }
    }

    EnviarSolicitacao(aprovacao: boolean, cadastro: any){
        const obj: AprovacaoRequest = new AprovacaoRequest();
        obj.Email = cadastro.email;
        obj.Cnpj = cadastro.cnpj;
        obj.LojaId = cadastro.lojaId;
        obj.IntencaoDeAprovacao = aprovacao;

        this.service.AprovarCadastroDoLojista(obj).subscribe((result) => {
            this.RemoverItemDaLista(cadastro);
            alert('Cadastro aceito com sucesso!');
        }, (err) => {
            if (err.status === 404) {
                alert(err.result);
            } else if (err.status === 505) {
                alert(err.result);
            } else {
                alert(err.result);
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