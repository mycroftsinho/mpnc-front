import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../../services/categoria/CategoriaService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const swal = require('sweetalert');

@Component({
    selector: 'app-alterar',
    templateUrl: './alterar.component.html',
    styleUrls: ['./alterar.component.scss'],
    providers: [CategoriaService]
})

export class AlterarComponent implements OnInit {

    categoria: any;
    id: any;
    categoriaForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: CategoriaService) {
    }

    carregarGroup() {
        this.categoriaForm = this.fb.group({
            'Descricao': [this.categoria.descricao, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Id': [this.categoria.id]
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (queryParams: any) => {
                this.id = queryParams['id'];
            }
        );

        this.BuscarCategoria();
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

    BuscarCategoria() {
        this.service.BuscarCategoria(this.id).subscribe((data: {}) => {
            console.log(data);
            this.categoria = data;
            this.carregarGroup();
        });
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
