import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {

  // ⚠️ ATENÇÃO: Coloque sua chave da API aqui
  private apiKey = '4087e9f0a1854f1ca58c08f81e4b5519'; 
  
  // Este caminho SÓ funciona com o proxy (Passo 2)
  private apiUrl = '/spoonacular-api'; 

  constructor(private http: HttpClient) { }

  /**
   * Envia a foto de um alimento e retorna as receitas
   */
  findRecipesByImage(imageFile: File): Observable<any> {
    
    const formData = new FormData();
    formData.append('file', imageFile, imageFile.name);
    const url = `${this.apiUrl}/food/images/analyze?apiKey=${this.apiKey}`;
    return this.http.post(url, formData);
  }
}