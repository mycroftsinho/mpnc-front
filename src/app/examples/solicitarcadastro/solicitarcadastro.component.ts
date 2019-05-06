import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroService } from '../../services/CadastroService';

@Component({
    selector: 'app-solicitarcadastro',
    templateUrl: './solicitarcadastro.component.html',
    styleUrls: ['./solicitarcadastro.component.scss'],
    providers: [CadastroService]
})

export class SolicitarCadastroComponent implements OnInit {

    solicitacaoForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private service: CadastroService) {
        this.solicitacaoForm = this.fb.group({
            Nome: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            Telefone: [null, Validators.compose([Validators.required])],
            Email: [null, Validators.compose([Validators.required, Validators.email])],
            Cep: [null, Validators.compose([Validators.required,
            Validators.minLength(8), Validators.maxLength(8)])],
            Rua: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            Numero: [null, Validators.compose([Validators.required])],
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
                this.router.navigate(['/index']);
            }, (err) => {
                console.log('Teste2');
                if (err.status === 404) {
                    alert('Email já cadastrado!');
                } else if (err.status === 505) {
                    alert('Erro na validação dos dados!');
                } else {
                    alert('Erro na comunicação com o servidor, tente mais tarde!');
                }

            });
    }

    ngOnInit() {
    }

}
