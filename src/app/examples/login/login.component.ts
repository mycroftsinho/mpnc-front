import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService } from '../../services/AutenticacaoService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AutenticacaoService]
})
export class LoginComponent implements OnInit {

    data: Date = new Date();
    focus;
    focus1;
    loginForm: FormGroup;
    invalidLogin: boolean;

    constructor(private router: Router, fb: FormBuilder, private service: AutenticacaoService) {

        this.loginForm = fb.group({
            email: [null, Validators.compose([Validators.required, Validators.email])],
            senha: [null, Validators.required]
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (const c in this.loginForm.controls) {
            this.loginForm.controls[c].markAsTouched();
        }

        if (this.loginForm.valid) {
            this.RealizarLogin(value);
        }
    }

    RealizarLogin(form: any) {
        this.service.RealizarLogin(form)
            .subscribe(response => {
                if (response != null && response.authenticated === true) {
                    localStorage.setItem('jwt', response.accessToken);
                    localStorage.setItem('user', response.user);
                    localStorage.setItem('perfil', response.perfil);
                    this.invalidLogin = false;
                    this.router.navigate(['/index']);
                } else {
                    this.invalidLogin = true;
                    alert('Dados inválidos.');
                }
            }, err => {
                alert('Não foi possível realizar a autenticação. Tente mais tarde!');
            });
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

}
