import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro/CadastroService';

const swal = require('sweetalert');

@Component({
    selector: 'app-cadastrar',
    templateUrl: './cadastrar.component.html',
    styleUrls: ['./cadastrar.component.scss'],
    providers: [CadastroService]
})

export class CadastrarComponent implements OnInit {

    messageAlert: string;
    clienteForm: FormGroup;

    constructor(private fb: FormBuilder, private service: CadastroService, private router: Router) {
        this.clienteForm = fb.group({
            'Nome': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Sobrenome': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Telefone': [null, Validators.compose([Validators.required, CustomValidators.number])],
            'Email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'Check': [null, Validators.required]
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (let c in this.clienteForm.controls) {
            this.clienteForm.controls[c].markAsTouched();
        }

        if (this.clienteForm.valid) {
            this.SubmeterCadastroDoCliente();
        }
    }

    SubmeterCadastroDoCliente() {
        this.service.CadastrarCliente(this.clienteForm.value)
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
