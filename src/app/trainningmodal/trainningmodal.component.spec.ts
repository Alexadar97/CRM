import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainningmodalComponent } from './trainningmodal.component';

describe('TrainningmodalComponent', () => {
  let component: TrainningmodalComponent;
  let fixture: ComponentFixture<TrainningmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainningmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainningmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
