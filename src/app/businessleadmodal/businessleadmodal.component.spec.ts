import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessleadmodalComponent } from './businessleadmodal.component';

describe('BusinessleadmodalComponent', () => {
  let component: BusinessleadmodalComponent;
  let fixture: ComponentFixture<BusinessleadmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessleadmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessleadmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
