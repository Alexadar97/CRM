import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessContactInformationComponent } from './business-contact-information.component';

describe('BusinessContactInformationComponent', () => {
  let component: BusinessContactInformationComponent;
  let fixture: ComponentFixture<BusinessContactInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessContactInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
