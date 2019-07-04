import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEnderecosComponent } from './listaenderecos.component';

describe('ListaEnderecosComponent', () => {
  let component: ListaEnderecosComponent;
  let fixture: ComponentFixture<ListaEnderecosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEnderecosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEnderecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
