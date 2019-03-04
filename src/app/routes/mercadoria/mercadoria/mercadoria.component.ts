import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MercadoriaService, RemoverMercadoria} from '../../../services/mercadoria/MercadoriaService';

const swal = require('sweetalert');

@Component({
    selector: 'app-mercadoria',
    templateUrl: './mercadoria.component.html',
    styleUrls: ['./mercadoria.component.scss'],
    providers: [MercadoriaService]
})

export class MercadoriaComponent implements OnInit {

    mercadorias: any = [];

    constructor(private router: Router, private service: MercadoriaService) {
    }

    ngOnInit() {
        this.BuscarMercadorias();
    }

    BuscarMercadorias() {
        this.mercadorias = [];
        this.service.BuscarMercadorias().subscribe((data: {}) => {
            console.log(data);
            this.mercadorias = data;
        });
    }

    AlterarMercadoria(id: any) {
        this.router.navigate(['/mercadoria/alterar'], { queryParams: { 'id': id } });
    }

    NovaMercadoria(id: any) {
        this.router.navigate(['/mercadoria/nova']);
    }

    RemoverMercadoria(mercadoria: any) {
        let obj: RemoverMercadoria = new RemoverMercadoria();
        obj.Id = mercadoria.id;
        this.service.RemoverMercadoria(obj)
        .subscribe((result) => {
            this.RemoverItemDaLista(mercadoria);
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

    RemoverItemDaLista(mercadoria: any) {
        const index = this.mercadorias.indexOf(mercadoria);
        if (index !== -1) {
            this.mercadorias.splice(index, 1);
        }
    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }

}
