import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailleadmodalComponent } from './retailleadmodal.component';

describe('RetailleadmodalComponent', () => {
  let component: RetailleadmodalComponent;
  let fixture: ComponentFixture<RetailleadmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailleadmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailleadmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
