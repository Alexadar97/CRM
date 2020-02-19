import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLeadInformationComponent } from './business-lead-information.component';

describe('BusinessLeadInformationComponent', () => {
  let component: BusinessLeadInformationComponent;
  let fixture: ComponentFixture<BusinessLeadInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessLeadInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessLeadInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
