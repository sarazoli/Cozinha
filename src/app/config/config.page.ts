import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthStateService } from '../services/auth-state';
import { Router } from '@angular/router'; 
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButtons, IonButton, 
  IonCard, IonCardContent, IonItem, IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonFooter,
    IonButtons, IonButton, IonCard, IonCardContent,
    IonItem, IonLabel, CommonModule, FormsModule, RouterModule
  ]
})
export class ConfigPage implements OnInit {
  private authService = inject(AuthStateService);
 private router = inject(Router);
  userName: string = '';

  ngOnInit() {
    // Assina o BehaviorSubject para atualizar automaticamente
    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });

    // Carrega do Firebase em segundo plano (se houver atualização)
    this.authService.loadUserDataFromFirestore();
  }
    logout() {
    this.authService.logout();
    this.router.navigate(['/home']);  // Redireciona para a página de login
  }
}
