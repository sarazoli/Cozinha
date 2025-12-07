import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadosCategoriaPage } from './resultados-categoria.page';

describe('ResultadosCategoriaPage', () => {
  let component: ResultadosCategoriaPage;
  let fixture: ComponentFixture<ResultadosCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
