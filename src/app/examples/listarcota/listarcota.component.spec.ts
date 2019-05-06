import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCotaComponent } from './listarcota.component';

describe('ListarCotaComponent', () => {
  let component: ListarCotaComponent;
  let fixture: ComponentFixture<ListarCotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
