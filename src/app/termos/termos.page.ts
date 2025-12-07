import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonSegment, IonSegmentContent, IonSegmentView,  IonSegmentButton, IonIcon, IonItem,IonBadge,IonList,IonButtons, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-termos',
  templateUrl: './termos.page.html',
  styleUrls: ['./termos.page.scss'],
  standalone: true,
  imports:  [IonContent, IonHeader, IonTitle, IonLabel, IonSegment, IonSegmentContent, IonSegmentView,  IonSegmentButton, IonIcon, IonItem,IonBadge,IonList, IonToolbar, CommonModule, FormsModule,IonButtons, IonButton, RouterModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class TermosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}