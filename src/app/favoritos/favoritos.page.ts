import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButtons, IonButton, IonIcon,IonCard, IonCardContent, IonItem, IonLabel, IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter, IonButtons, IonButton, IonIcon,IonCard, IonCardContent, IonItem, IonLabel, IonAvatar, RouterModule]
})
export class FavoritosPage implements OnInit {
isFavorito = true;    // começa com estrela cheia
mostraCard = true;    // card visível
  constructor() { }

  ngOnInit() {
  }







toggleFavorito() {
  this.isFavorito = false;

  // Espera 500 milissegundos (meio segundo) antes de esconder o card
  setTimeout(() => {
    this.mostraCard = false;
  }, 500);
}
}


