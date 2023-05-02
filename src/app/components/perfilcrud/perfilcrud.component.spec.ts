import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilcrudComponent } from './perfilcrud.component';

describe('PerfilcrudComponent', () => {
  let component: PerfilcrudComponent;
  let fixture: ComponentFixture<PerfilcrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilcrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilcrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
