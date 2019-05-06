import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLojaComponent } from './listarloja.component';

describe('ListarLojaComponent', () => {
  let component: ListarLojaComponent;
  let fixture: ComponentFixture<ListarLojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarLojaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
