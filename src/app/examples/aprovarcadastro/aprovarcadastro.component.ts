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
        obj.Nome = cadastro.nome;
        obj.IntencaoDeAprovacao = aprovacao;

        this.service.AprovarCadastroDoLojista(obj).subscribe((result) => {
            this.RemoverItemDaLista(cadastro);
        }, (err) => {
            console.log('Teste2');
            if (err.status === 404) {
                alert('Falha na aprovação do cadastro!');
            } else if (err.status === 505) {
                alert('Cadastro do motorista inválido!');
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
