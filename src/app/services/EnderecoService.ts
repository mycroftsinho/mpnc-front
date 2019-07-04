import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


const httpOptionsJson = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()

export class EnderecoService {
    private accessPointUrlProd = 'https://buscadoronline-back.azurewebsites.net/api';
    private accessPointUrlLocal = 'https://localhost:5001/api';
    private token = localStorage.getItem('application-usertoken');


    constructor(private http: HttpClient) {
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    BuscarEnderecos(email): Observable<any> {
        return this.http.get(this.accessPointUrlProd + '/Endereco/ListarEnderecos',
            {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + this.token,
                    'Content-Type': 'application/json'
                }),
                params: {
                    email: email
                }
            }).pipe(map(this.extractData));
    }

    EnviarCadastroDeEndereco(endereco): Observable<any> {
        console.log(endereco);

        return this.http.post(this.accessPointUrlProd + '/Endereco/CadastrarEndereco',
            endereco);
    }

    RemoverEndereco(endereco): Observable<any> {
        console.log(endereco);
        return this.http.post(this.accessPointUrlProd + '/Endereco/Remover', JSON.stringify(endereco),
        {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }
}
