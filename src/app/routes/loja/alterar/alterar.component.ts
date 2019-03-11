import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LojaService } from '../../../services/loja/LojaService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

const swal = require('sweetalert');

@Component({
    selector: 'app-alterar',
    templateUrl: './alterar.component.html',
    styleUrls: ['./alterar.component.scss'],
    providers: [LojaService]
})

export class AlterarComponent implements OnInit {

    loja: any;
    lojaId: any;
    solicitacaoForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: LojaService) {
    }

    carregarGroup() {
        this.solicitacaoForm = this.fb.group({
            LojaId: [this.loja.lojaId],
            Nome: [this.loja.nome, Validators.compose([Validators.required, Validators.minLength(5)])],
            Telefone: [this.loja.telefone, Validators.compose([Validators.required, CustomValidators.number])],
            Email: [this.loja.email, Validators.compose([Validators.required, CustomValidators.email])],
            Cep: [this.loja.cep, Validators.compose([Validators.required, CustomValidators.numer,
            Validators.minLength(8), Validators.maxLength(8)])],
            Rua: [this.loja.rua, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            Numero: [this.loja.numero, Validators.compose([Validators.required, CustomValidators.number])],
            Bairro: [this.loja.bairro, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            Cidade: [this.loja.cidade, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (queryParams: any) => {
                this.lojaId = queryParams.lojaId;
            }
        );

        this.BuscarLoja();
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

    BuscarLoja() {
        this.service.BuscarLoja(this.lojaId).subscribe((data: {}) => {
            console.log(data);
            this.loja = data;
            this.carregarGroup();
        });
    }

    SubmeterCadastroDaLoja() {
        this.service.AlterarLoja(this.solicitacaoForm.value)
            .subscribe((result) => {
                this.router.navigate(['/loja/listar']);
            }, (err) => {
                if (err.status === 404) {
                    this.sweetalertError('Falha no envio da resposta!');
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
}
