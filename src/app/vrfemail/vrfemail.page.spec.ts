import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VrfemailPage } from './vrfemail.page';

describe('VrfemailPage', () => {
  let component: VrfemailPage;
  let fixture: ComponentFixture<VrfemailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VrfemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
