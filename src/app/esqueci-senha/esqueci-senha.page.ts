import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// Importando os componentes do Ionic (standalone)
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonInput,
    IonLabel,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    RouterModule
  ],
})
export class EsqueciSenhaPage {
  email: string = '';

  constructor(
    private auth: Auth,
    private toastCtrl: ToastController
  ) {}

  async resetarSenha() {
    try {
      await sendPasswordResetEmail(this.auth, this.email);
      const toast = await this.toastCtrl.create({
        message: 'E-mail de redefinição enviado! Verifique sua caixa de entrada.',
        duration: 3000,
        color: 'success',
      });
      toast.present();
    } catch (error: any) {
      const toast = await this.toastCtrl.create({
        message: 'Erro ao enviar o e-mail. Verifique se está correto.',
        duration: 3000,
        color: 'danger',
      });
      toast.present();
      console.error(error);
    }
  }
}
