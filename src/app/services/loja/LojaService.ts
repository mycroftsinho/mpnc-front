import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class LojaService {

    private accessPointUrlProd = 'https://buscadoronline-back.azurewebsites.net/api';
    private accessPointUrlLocal = 'https://localhost:5001/api';
    private token = localStorage.getItem('jwt');

    constructor(private http: HttpClient) {
    }

    BuscarLojas(): Observable<any> {
        return this.http.get(this.accessPointUrlLocal + '/Loja/ListarLojas', 
        {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        }).pipe(map(this.extractData));
    }

    BuscarLoja(lojaId: any): Observable<any> {
        return this.http.get(this.accessPointUrlLocal + '/Loja/ObterLoja',
        {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }),
            params: {
                id: lojaId
            }
        }).pipe(map(this.extractData));
    }

    AlterarLoja(data: any): Observable<any> {
        console.log(data);
        return this.http.post(this.accessPointUrlLocal + '/Loja/CadastrarLoja', JSON.stringify(data), 
        {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

    InativarLoja(data: any): Observable<any> {
        console.log(data);
        return this.http.post(this.accessPointUrlLocal + '/Loja/Inativar', JSON.stringify(data), 
        {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }
}
