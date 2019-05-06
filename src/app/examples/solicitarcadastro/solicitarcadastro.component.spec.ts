import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCadastroComponent } from './solicitarcadastro.component';

describe('SolicitarCadastroComponent', () => {
  let component: SolicitarCadastroComponent;
  let fixture: ComponentFixture<SolicitarCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
