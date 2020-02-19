import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailContactsComponent } from './retail-contacts.component';

describe('RetailContactsComponent', () => {
  let component: RetailContactsComponent;
  let fixture: ComponentFixture<RetailContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
