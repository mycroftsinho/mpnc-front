import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptionsJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

@Injectable()

export class CategoriaService {
    constructor(private http: HttpClient) {
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }


    BuscarCategorias(): Observable<any> {
        return this.http.get('https://freteonline-back.azurewebsites.net/api/Categoria/ListarCategorias')
            .pipe(map(this.extractData));
    }

    BuscarCategoria(id: any): Observable<any> {
        return this.http.get('https://freteonline-back.azurewebsites.net/api/Categoria/ObterCategoria',
            { params: { 'id': id } }
        )
            .pipe(map(this.extractData));
    }

    AlterarCategoria(categoria: any): Observable<any> {
        return this.http.post('https://freteonline-back.azurewebsites.net/api/Categoria/CadastrarCategoria', JSON.stringify(categoria), httpOptionsJson);
    }

    RemoverCategoria(categoria: any): Observable<any> {
        return this.http.post('https://freteonline-back.azurewebsites.net/api/Categoria/RemoverCategoria', JSON.stringify(categoria), httpOptionsJson);
    }
}

export class RemoverCategoria {
    public Id: any;
}
