import { Component, OnInit, inject } from '@angular/core';
import { IonContent, IonHeader, IonLabel, IonTitle, IonCard, IonToolbar, IonButtons, IonButton, IonItem } from '@ionic/angular';
import { AuthStateService } from '../services/auth-state';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular'; 

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,  
  ]
})
export class ContaPage implements OnInit, ViewWillEnter {  

  // Variáveis para armazenar os dados
  userData: any = {
    nome: '',
    celular: '',
    email: '',
    senha: ''
  };

  // Controle de modo edição
  isEditing = false;

  // Referências para o AuthStateService e Firestore
  private authService = inject(AuthStateService);
  private firestore = inject(Firestore);

  constructor(private router: Router) {}

  ngOnInit() {
    // Lógica de inicialização padrão
  }

  // Corrigido para ViewWillEnter
  ionViewWillEnter() {
    this.loadUserData();
  }

  // Carrega os dados do usuário com base no UID
  async loadUserData() {
    const userId = this.authService.getUserId();
    if (userId) {
      const userDoc = await getDoc(doc(this.firestore, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        this.userData = {
          nome: data['nome'] || '',
          celular: data['celular'] || '',
          email: data['email'] || '',
          senha: data['senha'] || ''
        };
      }
    }
  }

  // Muda para o modo de edição
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  // Salva as alterações no Firebase
  async saveChanges() {
    const userId = this.authService.getUserId();
    if (userId) {
      const updatedData = {
        nome: this.userData.nome,
        celular: this.userData.celular,
        email: this.userData.email,
        senha: this.userData.senha
      };

      const userRef = doc(this.firestore, 'users', userId);
      await updateDoc(userRef, updatedData);

      // Atualiza o estado para o modo visualização
      this.isEditing = false;
      // Atualiza os dados localmente
      this.authService.setUserName(updatedData.nome);
    }
  }

  // Função para sair da conta (logout)
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);  // Redireciona para a página de login
  }
}
