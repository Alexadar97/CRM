import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDealComponent } from './search-deal.component';

describe('SearchDealComponent', () => {
  let component: SearchDealComponent;
  let fixture: ComponentFixture<SearchDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
