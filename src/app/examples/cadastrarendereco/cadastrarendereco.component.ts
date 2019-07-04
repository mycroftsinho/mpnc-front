import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnderecoService } from '../../services/EnderecoService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrarendereco',
  templateUrl: './cadastrarendereco.component.html',
  styleUrls: ['./cadastrarendereco.component.scss'],
  providers: [EnderecoService]
})
export class CadastrarEnderecoComponent implements OnInit {

  email: any;
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private service: EnderecoService, private route: ActivatedRoute) {
    this.email = localStorage.getItem('application-infouser');

    this.cadastroForm = this.fb.group({
      rua: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      bairro: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      cep: [null, Validators.compose([Validators.required])],
      numero: [null, Validators.compose([Validators.required])],
      telefone: [null, Validators.compose([Validators.required])],
      imagem: [null]
    });
  }

  ngOnInit() {
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cadastroForm.get('imagem').setValue(file);
    }
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    // tslint:disable-next-line: forin
    for (let c in this.cadastroForm.controls) {
      this.cadastroForm.controls[c].markAsTouched();
    }

    if (this.cadastroForm.valid) {
      this.SubmeterCadastroDoEndereco();
    }
  }

  SubmeterCadastroDoEndereco() {
    const formData = new FormData();
    formData.append('imagem', this.cadastroForm.get('imagem').value);
    formData.append('telefone', this.cadastroForm.get('telefone').value);
    formData.append('numero', this.cadastroForm.get('numero').value);
    formData.append('cep', this.cadastroForm.get('cep').value);
    formData.append('bairro', this.cadastroForm.get('bairro').value);
    formData.append('rua', this.cadastroForm.get('rua').value);
    formData.append('email', this.email);

    this.service.EnviarCadastroDeEndereco(formData)
      .subscribe((result) => {
        alert('Loja cadastrada com sucesso!');
        this.router.navigate(['/listaenderecos']);
      }, (err) => {
        console.log(err);
        if (err.status === 404) {
          alert('Usuário não é um lojista!!');
        } else if (err.status === 400) {
          alert('Erro na validação dos dados!');
        } else {
          alert('Erro na comunicação com o servidor, tente mais tarde!');
        }

      });
  }

}
