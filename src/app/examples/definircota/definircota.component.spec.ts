import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinirCotaComponent } from './definircota.component';

describe('DefinirCotaComponent', () => {
  let component: DefinirCotaComponent;
  let fixture: ComponentFixture<DefinirCotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinirCotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirCotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
