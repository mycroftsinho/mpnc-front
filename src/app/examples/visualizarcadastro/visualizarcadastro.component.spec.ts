import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCadastroComponent } from './visualizarcadastro.component';

describe('VisualizarCadastroComponent', () => {
  let component: VisualizarCadastroComponent;
  let fixture: ComponentFixture<VisualizarCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
