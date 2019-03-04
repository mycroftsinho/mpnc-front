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
  private accessPointUrl: string = 'https://freteonline-back.azurewebsites.net/api/Cadastro/SolicitarCadastro';
  // private accessPointUrl: string = 'https://localhost:5001/api/Cadastro/SolicitarCadastro';


  constructor(private http: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  // AdicionarCadastroDoMotorista(data) : Observable<SolicitacaoRequest> {
  //   var result = this.http.post(this.accessPointUrl, data, { headers: this.headers });
  //   console.log(result);
  // }

  AdicionarCadastroDoMotorista(product): Observable<any> {
    console.log(product);
    return this.http.post('https://freteonline-back.azurewebsites.net/api/Cadastro/SolicitarCadastro', JSON.stringify(product), httpOptionsJson);
  }

  FinalizarCadastroDoMotorista(product): Observable<any> {
    console.log(product);
    return this.http.post('https://freteonline-back.azurewebsites.net/api/Cadastro/FinalizarSolicitacao', JSON.stringify(product), httpOptionsJson);
  }

  AprovarCadastroDoMotorista(product): Observable<any> {
    console.log(product);
    return this.http.post('https://freteonline-back.azurewebsites.net/api/Cadastro/AprovarCadastro', JSON.stringify(product), httpOptionsJson);
  }

  BuscarCadastrosPendentes(): Observable<any> {
    return this.http.get('https://freteonline-back.azurewebsites.net/api/Cadastro/ListarCadastrosPendentes')
      .pipe(map(this.extractData));
  }

  BuscarCadastro(id, email): Observable<any> {
    return this.http.get('https://freteonline-back.azurewebsites.net/api/Cadastro/ObterCadastro', {
      params: {
        'MotoristaId': id,
        'Email': email
      }
    }).pipe(map(this.extractData));
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

export class SolicitacaoRequest {
  public Nome;
  public Sobrenome;
  public Telefone;
  public Email;
  public Cidade;
}

export class SolicitacaoFullRequest {
  public Email;
  public Rua;
  public Numero;
  public Bairro;
  public Cep;
  public Rg;
  public Cpf;
  public Selfie;
  public Documento;
}

export class ObterCadastrorequest {
  public MotoristaId;
  public Email;
}

export class AprovacaoRequest {
  public MotoristaId;
  public Email;
  public IntencaoDeAprovacao;
}

export class CadastroDoMotorista {
  public MotoristaId;
  public Email;
  public Rua;
  public Numero;
  public Bairro;
  public Cep;
  public Rg;
  public Cpf;
  public Selfie;
  public Documento;
  public Nome;
  public Sobrenome;
  public Telefone;
  public Cidade;
}