import { TestBed } from '@angular/core/testing';
// 1. Altera a importação para o nome CORRETO do seu Service
import { ReceitasService } from './receitas'; 

describe('ReceitasService', () => {
  // 2. Altera a declaração da variável local
  let service: ReceitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // 3. Altera a classe injetada
    service = TestBed.inject(ReceitasService); 
  });

  it('should be created', () => {
    // Verifica se o serviço foi instanciado corretamente
    expect(service).toBeTruthy();
  });
});