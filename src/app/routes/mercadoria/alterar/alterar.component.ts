import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MercadoriaService } from '../../../services/mercadoria/MercadoriaService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const swal = require('sweetalert');

@Component({
    selector: 'app-alterar',
    templateUrl: './alterar.component.html',
    styleUrls: ['./alterar.component.scss'],
    providers: [MercadoriaService]
})

export class AlterarComponent implements OnInit {

    mercadoria: any;
    id: any;
    mercadoriaForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: MercadoriaService) {
    }

    carregarGroup() {
        this.mercadoriaForm = this.fb.group({
            'Descricao': [this.mercadoria.descricao, Validators.compose([Validators.required, Validators.minLength(5)])],
            'Id': [this.mercadoria.id]
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (queryParams: any) => {
                this.id = queryParams['id'];
            }
        );

        this.BuscarMercadoria();
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (let c in this.mercadoriaForm.controls) {
            this.mercadoriaForm.controls[c].markAsTouched();
        }

        if (this.mercadoriaForm.valid) {
            this.SubmeterCadastroDaMercadoria();
        }
    }

    BuscarMercadoria() {
        this.service.BuscarMercadoria(this.id).subscribe((data: {}) => {
            console.log(data);
            this.mercadoria = data;
            this.carregarGroup();
        });
    }

    SubmeterCadastroDaMercadoria() {
        this.service.AlterarMercadoria(this.mercadoriaForm.value)
            .subscribe((result) => {
                this.router.navigate(['/mercadoria']);
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
