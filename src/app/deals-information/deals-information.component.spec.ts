import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsInformationComponent } from './deals-information.component';

describe('DealsInformationComponent', () => {
  let component: DealsInformationComponent;
  let fixture: ComponentFixture<DealsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
