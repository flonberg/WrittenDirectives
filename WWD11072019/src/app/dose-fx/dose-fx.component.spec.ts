import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseFxComponent } from './dose-fx.component';

describe('DoseFxComponent', () => {
  let component: DoseFxComponent;
  let fixture: ComponentFixture<DoseFxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoseFxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoseFxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
