import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailcontactInformationComponent } from './retailcontact-information.component';

describe('RetailcontactInformationComponent', () => {
  let component: RetailcontactInformationComponent;
  let fixture: ComponentFixture<RetailcontactInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailcontactInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailcontactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
