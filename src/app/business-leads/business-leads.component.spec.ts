import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLeadsComponent } from './business-leads.component';

describe('BusinessLeadsComponent', () => {
  let component: BusinessLeadsComponent;
  let fixture: ComponentFixture<BusinessLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
