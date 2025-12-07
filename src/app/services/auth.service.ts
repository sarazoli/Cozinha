import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private apiUrl = 'https://sua-api.com/api/auth'; 
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) { }

  // 1. Lógica de Login (MOCK TEMPORÁRIO)
  login(email: string, senha: string): Observable<any> {
    console.log("--- EXECUTANDO MOCK DE LOGIN ---");

    if (email !== 'teste@cozinha.com' || senha !== '123456') {
        return new Observable(observer => {
            setTimeout(() => {
                observer.error({ status: 401, message: 'Credenciais de Mock inválidas' });
            }, 500);
        });
    }

    return new Observable(observer => {
        setTimeout(async () => { // ⭐️ O saveToken é assíncrono, então esta função também precisa ser 'async'
            const mockToken = 'MOCK_TOKEN_DEV_12345';
            await this.saveToken(mockToken); // ⭐️ Usando await na função corrigida

            observer.next({ success: true, token: mockToken }); 
            observer.complete();
        }, 1000);
    });
  }

  // 2. Lógica de Registro (Implementação completa para a API)
  register(dadosCadastro: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/register`, dadosCadastro);
  }

  // 3. ⭐️ CORREÇÃO: Verificação de Autenticação (Resolve o erro TS1345)
  async isAuthenticated(): Promise<boolean> { 
    // Garante que a função retorna um valor booleano
    const { value } = await Preferences.get({ key: this.tokenKey });
    return !!value; 
  }
  
  // 4. ⭐️ CORREÇÃO: Armazenamento do Token (Método assíncrono completo)
  private async saveToken(token: string) {
    await Preferences.set({ key: this.tokenKey, value: token });
  }

  // 5. Lógica de Logout
  async logout() {
    await Preferences.remove({ key: this.tokenKey });
  }
}