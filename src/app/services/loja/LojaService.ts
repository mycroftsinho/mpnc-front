import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';

const httpOptionsJson = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()

export class LojaService {

    private accessPointUrlProd = 'https://buscadoronline-back.azurewebsites.net/api';
    private accessPointUrlLocal = 'https://localhost:5001/api';

    constructor(private http: HttpClient) {
    }

    BuscarLojas(): Observable<any> {
        return this.http.get(this.accessPointUrlLocal + '/Loja/ListarLojas')
            .pipe(map(this.extractData));
    }

    BuscarLoja(lojaId: any): Observable<any> {
        return this.http.get(this.accessPointUrlLocal + '/Loja/ObterLoja', {
            params: {
                id: lojaId
              }
            })
        .pipe(map(this.extractData));
    }

    AlterarLoja(data: any): Observable<any> {
        console.log(data);
        return this.http.post(this.accessPointUrlLocal + '/Loja/CadastrarLoja',
            JSON.stringify(data), httpOptionsJson);
    }

    InativarLoja(data: any): Observable<any> {
        console.log(data);
        return this.http.post(this.accessPointUrlLocal + '/Loja/Inativar',
            JSON.stringify(data), httpOptionsJson);
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }
}
