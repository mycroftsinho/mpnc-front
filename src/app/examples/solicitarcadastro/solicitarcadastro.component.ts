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
            nome: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            empresa: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            cnpj: [null, Validators.compose([Validators.required])],
            telefone: [null, Validators.compose([Validators.required])],
            email: [null, Validators.compose([Validators.required, Validators.email])]
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
                alert('Solicitação enviada com sucesso! Aguarde o contato dos nossos representantes.');
                this.router.navigate([this.router.url]);
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
