import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemogComponent } from './demog.component';

describe('DemogComponent', () => {
  let component: DemogComponent;
  let fixture: ComponentFixture<DemogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
