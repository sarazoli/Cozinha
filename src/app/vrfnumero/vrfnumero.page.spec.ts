import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VrfnumeroPage} from './vrfnumero.page';

describe('VrfnumeroPage', () => {
  let component: VrfnumeroPage;
  let fixture: ComponentFixture<VrfnumeroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VrfnumeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
