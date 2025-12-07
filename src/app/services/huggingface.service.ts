import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HuggingfaceService {

  private apiKey = 'XXXXXXX';
  private apiUrl = 'https://api-inference.huggingface.co/models/nateraw/food';

  constructor(private http: HttpClient) {}

  private base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
  }

  reconhecerAlimento(base64: string) {
    const blob = this.base64ToBlob(base64);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.post(this.apiUrl, blob, { headers });
  }
}
