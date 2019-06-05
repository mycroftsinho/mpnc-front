import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CadastroService } from '../../services/CadastroService';
import { AprovacaoRequest } from 'app/models/AprocacaoRequest';

@Component({
    selector: 'app-visualizarcadastro',
    templateUrl: './visualizarcadastro.component.html',
    styleUrls: ['./visualizarcadastro.component.scss'],
    providers: [CadastroService]
})

export class VisualizarCadastroComponent implements OnInit {

    email: string;
    cadastro: any;
    solicitacaoForm: FormGroup;
    nome: any;

    constructor(private fb: FormBuilder, private service: CadastroService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (queryParams: any) => {
                this.nome = queryParams.nome;
                this.email = queryParams.email;
            }
        );
        this.BuscarCadastros();
    }

    BuscarCadastros() {
        this.service.BuscarCadastro(this.nome, this.email).subscribe((data: {}) => {
            console.log(data);
            this.cadastro = data;
        });
    }

    AprovarCadastro(aprovacao: boolean) {
        const obj: AprovacaoRequest = new AprovacaoRequest();
        obj.Email = this.cadastro.email;
        obj.Cnpj = this.cadastro.nome;
        obj.IntencaoDeAprovacao = aprovacao;

        this.service.AprovarCadastroDoLojista(obj).subscribe((result) => {
            this.router.navigate(['/cadastro/pendentes']);
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

    VoltarParaVisualizcao() {
        this.router.navigate(['/cadastro/pendentes']);
    }

}