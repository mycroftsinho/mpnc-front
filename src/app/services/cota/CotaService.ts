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

export class CotaService {
    private accessPointUrlProd = 'https://buscadoronline-back.azurewebsites.net/api';
    private accessPointUrlLocal = 'https://localhost:5001/api';


    constructor(private http: HttpClient) {
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    BuscarCotas(): Observable<any> {
        return this.http.get(this.accessPointUrlLocal + '/Cota/ListarCotas')
            .pipe(map(this.extractData));
    }

    DefinirCota(product): Observable<any> {
        console.log(product);

        return this.http.post(this.accessPointUrlLocal + '/Cota/DefinirCota',
            JSON.stringify(product), httpOptionsJson);
    }
}
