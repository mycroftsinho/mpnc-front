import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro/CadastroService';

const swal = require('sweetalert');

@Component({
    selector: 'app-validation',
    templateUrl: './finalizarCadastro.component.html',
    styleUrls: ['./finalizarCadastro.component.scss'],
    providers: [CadastroService]
})

export class FinalizarCadastroComponent implements OnInit {
    motoristaForm: FormGroup;
    email: string;
    cadastro: any;
    id = '0';

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private service: CadastroService) {
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

    carregarGroup() {
        this.motoristaForm = this.fb.group({
            'Nome': [this.cadastro.nome, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Sobrenome': [this.cadastro.sobrenome, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Telefone': [this.cadastro.telefone, Validators.compose([Validators.required, CustomValidators.number])],
            'Email': [this.cadastro.email, Validators.compose([Validators.required, CustomValidators.email])],
            'Cep': [this.cadastro.cep, Validators.compose([Validators.required, CustomValidators.numer,
            Validators.minLength(8), Validators.maxLength(8)])],
            'Rua': [this.cadastro.rua, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            'Numero': [this.cadastro.numero, Validators.compose([Validators.required, CustomValidators.number])],
            'Bairro': [this.cadastro.bairro, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            'Cidade': [this.cadastro.cidade, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            'Rg': [this.cadastro.rg, Validators.compose([Validators.required, CustomValidators.numer,
            Validators.minLength(2), Validators.maxLength(15)])],
            'Cpf': [this.cadastro.cpf, Validators.compose([Validators.required, CustomValidators.numer,
            Validators.minLength(11), Validators.maxLength(11)])]
        });
    }

    BuscarCadastros() {
        this.service.BuscarCadastro(this.id, this.email).subscribe((data: {}) => {
            this.cadastro = data;
            this.carregarGroup();
        });
    }

    SubmeterCadastroDoMotorista() {
        this.service.FinalizarCadastroDoMotorista(this.motoristaForm.value)
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
        this.route.queryParams.subscribe(
            (queryParams: any) => {
                this.email = queryParams['email'];
            }
        );
        this.BuscarCadastros();
    }

}
