import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Receita {
    id: string; 
    nome: string;
    imagem: string;
    
}
@Injectable({
  providedIn: 'root'
})


export class ReceitasService {
  
  // 🚨 ATENÇÃO: SUBSTITUA ESTA URL PELA URL DE IMPLANTAÇÃO CORRETA!
  // (Procure no README.md do GitHub)
  private readonly API_BASE_URL = 'https://cozinha-api.vercel.app/api/receitas'; 
  

  constructor(private http: HttpClient) { }
  

  buscarReceitaPorId(id: string): Observable<any> {
    // 🚨 AJUSTE A URL se for diferente do padrão /api/receitas/:id
    const urlDetalhe = `${this.API_BASE_URL}/${id}`; 
    return this.http.get<any>(urlDetalhe);
}
  /**
   * Busca todas as receitas da nova API.
   * Assumindo que a rota base retorna todas as receitas em um array.
   */
  buscarTodasReceitas(): Observable<any[]> {
    // Nesta API, o GET direto na URL principal provavelm
    // ente retorna todas as receitas.
    return this.http.get<any[]>(this.API_BASE_URL);
  }

buscarReceitasPorTermo(termo: string): Observable<Receita[]> {
    // CRÍTICO: Use o termo para construir a URL de busca
    // Exemplo: /v1/recipes?search=feijoada
    const urlBusca = `${this.API_BASE_URL}?search=${termo}`; 
    
    // Retorna a chamada HTTP GET
    return this.http.get<Receita[]>(urlBusca);
  }
  
}
