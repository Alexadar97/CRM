import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailleadInformationComponent } from './retaillead-information.component';

describe('RetailleadInformationComponent', () => {
  let component: RetailleadInformationComponent;
  let fixture: ComponentFixture<RetailleadInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailleadInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailleadInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
