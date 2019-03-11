import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { CadastroService } from '../../../services/cadastro/CadastroService';

const swal = require('sweetalert');

@Component({
    selector: 'app-solicitacao',
    templateUrl: './solicitacao.component.html',
    styleUrls: ['./solicitacao.component.scss'],
    providers: [CadastroService]
})

export class SolicitacaoComponent implements OnInit {

    solicitacaoForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private service: CadastroService) {
        this.solicitacaoForm = this.fb.group({
            Nome: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            Telefone: [null, Validators.compose([Validators.required, CustomValidators.number])],
            Email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            Cep: [null, Validators.compose([Validators.required, CustomValidators.numer,
            Validators.minLength(8), Validators.maxLength(8)])],
            Rua: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            Numero: [null, Validators.compose([Validators.required, CustomValidators.number])],
            Bairro: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            Cidade: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (let c in this.solicitacaoForm.controls) {
            this.solicitacaoForm.controls[c].markAsTouched();
        }

        if (this.solicitacaoForm.valid) {
            this.SubmeterCadastroDaLoja();
        }
    }

    SubmeterCadastroDaLoja() {
        this.service.EnviarSolicitacaoDaLoja(this.solicitacaoForm.value)
            .subscribe((result) => {
                this.router.navigate(['/home']);
            }, (err) => {
                console.log('Teste2');
                if (err.status === 404) {
                    this.sweetalertError('Email já cadastrado!');
                } else if (err.status === 505) {
                    this.sweetalertError('Erro na validação dos dados!');
                } else {
                    this.sweetalertError('Erro na comunicação com o servidor, tente mais tarde!');
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

    ngOnInit() {
    }

}
