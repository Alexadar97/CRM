import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailLeadsComponent } from './retail-leads.component';

describe('RetailLeadsComponent', () => {
  let component: RetailLeadsComponent;
  let fixture: ComponentFixture<RetailLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
