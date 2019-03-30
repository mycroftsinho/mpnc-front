import { CustomValidators } from 'ng2-validation';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AutenticacaoService } from '../../../services/autenticacao/AutenticacaoService';
import { Router } from '@angular/router';

const swal = require('sweetalert');

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [AutenticacaoService]
})
export class RegisterComponent implements OnInit {

    valForm: FormGroup;

    constructor(public settings: SettingsService, fb: FormBuilder, private service: AutenticacaoService, private router: Router) {

        const password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        const confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.valForm = fb.group({
            username: [null, Validators.required],
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            accountagreed: [null, Validators.required],
            password,
            confirmPassword
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
// tslint:disable-next-line: forin
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid) {
            console.log(value);
            this.RegistrarUsuario(value);
        }
    }

    RegistrarUsuario(form: any) {
        this.service.RegistrarUsuario(form)
            .subscribe(response => {
                this.router.navigate(['/login']);
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
