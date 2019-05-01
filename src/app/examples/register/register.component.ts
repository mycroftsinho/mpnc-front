import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService } from '../../services/AutenticacaoService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AutenticacaoService]
})
export class RegisterComponent implements OnInit {

  data: Date = new Date();
  focus;
  focus1;
  registerForm: FormGroup;

  constructor(fb: FormBuilder, private service: AutenticacaoService, private router: Router) {

    this.registerForm = fb.group({
      username: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      accountagreed: [null, Validators.required],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    // tslint:disable-next-line: forin
    for (let c in this.registerForm.controls) {
      this.registerForm.controls[c].markAsTouched();
    }

    if (this.registerForm.valid) {
      console.log(value);
      this.RegistrarUsuario(value);
    }
  }

  RegistrarUsuario(form: any) {
    this.service.RegistrarUsuario(form)
      .subscribe(response => {
        this.router.navigate(['/login']);
      }, err => {
        alert('Não foi possível realizar a autenticação. Tente mais tarde!');
      });
  }

  ngOnInit() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}
