import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSelectedModalComponent } from './retail-selected-modal.component';

describe('RetailSelectedModalComponent', () => {
  let component: RetailSelectedModalComponent;
  let fixture: ComponentFixture<RetailSelectedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailSelectedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailSelectedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
