import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../../../core/settings/settings.service';
import { AutenticacaoService } from '../../../services/autenticacao/AutenticacaoService';

const swal = require('sweetalert');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AutenticacaoService]
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;
    invalidLogin: boolean;

    constructor(private router: Router, public settings: SettingsService, fb: FormBuilder, private service: AutenticacaoService) {

        this.valForm = fb.group({
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            senha: [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (const c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid) {
            this.RealizarLogin(value);
        }
    }

    RealizarLogin(form: any) {
        this.service.RealizarLogin(form)
            .subscribe(response => {
                if (response != null && response.authenticated === true) {
                    const token = response.accessToken;
                    localStorage.setItem('jwt', token);
                    this.invalidLogin = false;
                    this.router.navigate(['/home']);
                } else {
                    this.invalidLogin = true;
                    this.sweetalertError('Dados inválidos.');
                }
            }, err => {
                this.sweetalertError('Não foi possível realizar a autenticação. Tente mais tarde!');
            });
    }

    ngOnInit() {

    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }

}
