import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesscontactmodalComponent } from './businesscontactmodal.component';

describe('BusinesscontactmodalComponent', () => {
  let component: BusinesscontactmodalComponent;
  let fixture: ComponentFixture<BusinesscontactmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesscontactmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesscontactmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
