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

export class CadastroService {
    private params: HttpParams;
    private accessPointUrlProd = 'https://buscadoronline-back.azurewebsites.net/api';
    private accessPointUrlLocal = 'https://localhost:5001/api';


    constructor(private http: HttpClient) {
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    EnviarSolicitacaoDaLoja(product): Observable<any> {
        console.log(product);

        return this.http.post(this.accessPointUrlLocal + '/Cadastro/SolicitarCadastro',
            JSON.stringify(product), httpOptionsJson);
    }

    AprovarCadastroDoLojista(product): Observable<any> {
        console.log(product);
        return this.http.post(this.accessPointUrlLocal + '/Cadastro/AprovarCadastro',
          JSON.stringify(product), httpOptionsJson);
      }

    BuscarCadastrosPendentes(): Observable<any> {
        return this.http.get(this.accessPointUrlLocal + '/Cadastro/ListarCadastrosPendentes')
            .pipe(map(this.extractData));
    }

    BuscarCadastro(nome: string, email: string): Observable<any> {
        return this.http.get(this.accessPointUrlLocal + '/Cadastro/ObterCadastro', {
        params: {
            Nome: nome,
            Email: email
          }
        }).pipe(map(this.extractData));
    }

    CadastrarCliente(data: any): Observable<any> {
        console.log(data);
        return this.http.post(this.accessPointUrlLocal + '/Cliente/Cadastro',
          JSON.stringify(data), httpOptionsJson);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
