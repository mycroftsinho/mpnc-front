import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService, RemoverCategoria } from '../../../services/categoria/CategoriaService';

const swal = require('sweetalert');

@Component({
    selector: 'app-categoria',
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.scss'],
    providers: [CategoriaService]
})

export class CategoriaComponent implements OnInit {

    categorias: any = [];
    constructor(private router: Router, private service: CategoriaService) {
    }

    ngOnInit() {
        this.BuscarCategorias();
    }

    BuscarCategorias() {
        this.categorias = [];
        this.service.BuscarCategorias().subscribe((data: {}) => {
            console.log(data);
            this.categorias = data;
        });
    }

    AlterarCategoria(id: any) {
        this.router.navigate(['/categoria/alterar'], { queryParams: { 'id': id } });
    }

    NovaCategoria(id: any) {
        this.router.navigate(['/categoria/nova']);
    }

    RemoverCategoria(categoria: any) {
        let obj: RemoverCategoria = new RemoverCategoria();
        obj.Id = categoria.id;
        this.service.RemoverCategoria(obj)
        .subscribe((result) => {
            this.RemoverItemDaLista(categoria);
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

    RemoverItemDaLista(categoria: any) {
        const index = this.categorias.indexOf(categoria);
        if (index !== -1) {
            this.categorias.splice(index, 1);
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
