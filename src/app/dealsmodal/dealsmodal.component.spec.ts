import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsmodalComponent } from './dealsmodal.component';

describe('DealsmodalComponent', () => {
  let component: DealsmodalComponent;
  let fixture: ComponentFixture<DealsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
