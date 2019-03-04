import { Component, OnInit } from '@angular/core';
import { CadastroService, AprovacaoRequest } from '../../../services/cadastro/CadastroService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

const swal = require('sweetalert');

@Component({
    selector: 'app-visualizar',
    templateUrl: './visualizar.component.html',
    styleUrls: ['./visualizar.component.scss'],
    providers: [CadastroService]
})

export class VisualizarComponent implements OnInit {

    id: string;
    email: string;
    cadastro: any;
    motoristaForm: FormGroup;

    constructor(private fb: FormBuilder, private service: CadastroService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (queryParams: any) => {
                this.id = queryParams['id'];
                this.email = queryParams['email'];
            }
        );
        this.BuscarCadastros();
    }

    BuscarCadastros() {
        this.service.BuscarCadastro(this.id, this.email).subscribe((data: {}) => {
            console.log(data);
            this.cadastro = data;
        });
    }

    AprovarCadastro(aprovacao: boolean){
        const obj: AprovacaoRequest = new AprovacaoRequest();
        obj.Email = this.cadastro.email;
        obj.MotoristaId = this.cadastro.motoristaId;
        obj.IntencaoDeAprovacao = aprovacao;

        this.service.AprovarCadastroDoMotorista(obj).subscribe((result) => {
            this.router.navigate(['/cadastro/listarCadastrosPendentes']);
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

    VoltarParaVisualizcao() {
        this.router.navigate(['/cadastro/listarCadastrosPendentes']);
    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }
}
