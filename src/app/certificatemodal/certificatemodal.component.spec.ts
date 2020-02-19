import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatemodalComponent } from './certificatemodal.component';

describe('CertificatemodalComponent', () => {
  let component: CertificatemodalComponent;
  let fixture: ComponentFixture<CertificatemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
