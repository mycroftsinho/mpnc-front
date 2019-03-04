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

export class MercadoriaService {
    constructor(private http: HttpClient) {
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    BuscarMercadorias(): Observable<any> {
        return this.http.get('https://freteonline-back.azurewebsites.net/api/Mercadoria/ListarMercadorias')
            .pipe(map(this.extractData));
    }

    BuscarMercadoria(id: any): Observable<any> {
        return this.http.get('https://freteonline-back.azurewebsites.net/api/Mercadoria/ObterMercadoria',
            { params: { 'id': id } }
        )
            .pipe(map(this.extractData));
    }

    AlterarMercadoria(mercadoria: any): Observable<any> {
        return this.http.post('https://freteonline-back.azurewebsites.net/api/Mercadoria/CadastrarMercadoria', JSON.stringify(mercadoria), httpOptionsJson);
    }

    RemoverMercadoria(mercadoria: any): Observable<any> {
        return this.http.post('https://freteonline-back.azurewebsites.net/api/Mercadoria/RemoverMercadoria', JSON.stringify(mercadoria), httpOptionsJson);
    }
}

export class RemoverMercadoria {
    public Id: any;

}
