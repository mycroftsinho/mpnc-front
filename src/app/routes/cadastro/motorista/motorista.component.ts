import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro/CadastroService';

const swal = require('sweetalert');

@Component({
    selector: 'app-validation',
    templateUrl: './motorista.component.html',
    styleUrls: ['./motorista.component.scss'],
    providers: [CadastroService]
})

export class MotoristaComponent implements OnInit {

    messageAlert: string;
    motoristaForm: FormGroup;

    constructor(private fb: FormBuilder, private service: CadastroService, private router: Router) {
        this.motoristaForm = fb.group({
            'Nome': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Sobrenome': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Telefone': [null, Validators.compose([Validators.required, CustomValidators.number])],
            'Email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'Cidade': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Check': [null, Validators.required]
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (let c in this.motoristaForm.controls) {
            this.motoristaForm.controls[c].markAsTouched();
        }

        if (this.motoristaForm.valid) {
            this.SubmeterCadastroDoMotorista();
        }
    }

    SubmeterCadastroDoMotorista() {
        this.service.AdicionarCadastroDoMotorista(this.motoristaForm.value)
            .subscribe((result) => {
                this.router.navigate(['/cadastro/finalizarCadastro'],
                    {
                        queryParams: {
                            'email': this.motoristaForm.controls.Email.value
                        }
                    });
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
        if (this.messageAlert) {
            this.sweetalertError('teste');
        }
    }

}
