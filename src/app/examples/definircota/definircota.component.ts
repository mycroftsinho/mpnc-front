import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CotaService } from '../../services/CotaService';

@Component({
    selector: 'app-definircota',
    templateUrl: './definircota.component.html',
    styleUrls: ['./definircota.component.scss'],
    providers: [CotaService]
})

export class DefinirCotaComponent implements OnInit {

    messageAlert: string;
    cotaForm: FormGroup;
    lojaId: any;
    quantidade: any;

    constructor(private fb: FormBuilder, private service: CotaService, private router: Router, private route: ActivatedRoute) {
    }

    MontarFormulario() {
        this.cotaForm = this.fb.group({
            Quantidade: [this.quantidade, Validators.required],
            LojaId: [this.lojaId]
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (let c in this.cotaForm.controls) {
            this.cotaForm.controls[c].markAsTouched();
        }

        if (this.cotaForm.valid) {
            this.SubmeterCotaDaLoja();
        }
    }

    SubmeterCotaDaLoja() {
        this.service.DefinirCota(this.cotaForm.value)
            .subscribe((result) => {
                this.router.navigate(['/cota/listar']);
            }, (err) => {
                console.log('Teste2');
                if (err.status === 404) {
                    alert('Erro na comunicação com o servidor, tente mais tarde!');
                } else if (err.status === 505) {
                    alert('Erro na validação dos dados!');
                } else {
                    alert('Erro na comunicação com o servidor, tente mais tarde!');
                }
            });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (queryParams: any) => {
                this.lojaId = queryParams.lojaId;
                this.quantidade = queryParams.quantidade;
            }
        );

        this.MontarFormulario();
    }

}
