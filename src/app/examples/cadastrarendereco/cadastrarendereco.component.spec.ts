import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEnderecoComponent } from './cadastrarendereco.component';

describe('CadastrarenderecoComponent', () => {
  let component: CadastrarEnderecoComponent;
  let fixture: ComponentFixture<CadastrarEnderecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarEnderecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
