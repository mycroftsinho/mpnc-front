import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../../services/categoria/CategoriaService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const swal = require('sweetalert');

@Component({
    selector: 'app-nova',
    templateUrl: './nova.component.html',
    styleUrls: ['./nova.component.scss'],
    providers: [CategoriaService]
})

export class NovaComponent implements OnInit {

    categoria: any;
    id: any;
    categoriaForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: CategoriaService) {
        this.carregarGroup();
    }

    carregarGroup() {
        this.categoriaForm = this.fb.group({
            'Descricao': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Id': [null]
        });
    }

    ngOnInit() {

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (let c in this.categoriaForm.controls) {
            this.categoriaForm.controls[c].markAsTouched();
        }

        if (this.categoriaForm.valid) {
            this.SubmeterCadastroDaCategoria();
        }
    }

    SubmeterCadastroDaCategoria() {
        this.service.AlterarCategoria(this.categoriaForm.value)
            .subscribe((result) => {
                this.router.navigate(['/categoria']);
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
