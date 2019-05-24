import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


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
        return this.http.get(this.accessPointUrlProd + '/Cota/ListarCotas', httpOptionsJson)
            .pipe(map(this.extractData));
    }

    DefinirCota(product): Observable<any> {
        console.log(product);

        return this.http.post(this.accessPointUrlProd + '/Cota/DefinirCota',
            JSON.stringify(product), httpOptionsJson);
    }
}
