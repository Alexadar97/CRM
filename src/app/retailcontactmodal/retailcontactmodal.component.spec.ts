import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailcontactmodalComponent } from './retailcontactmodal.component';

describe('RetailcontactmodalComponent', () => {
  let component: RetailcontactmodalComponent;
  let fixture: ComponentFixture<RetailcontactmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailcontactmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailcontactmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
