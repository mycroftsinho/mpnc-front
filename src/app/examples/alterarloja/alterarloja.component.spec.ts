import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarLojaComponent } from './alterarloja.component';

describe('AlterarLojaComponent', () => {
  let component: AlterarLojaComponent;
  let fixture: ComponentFixture<AlterarLojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarLojaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
