import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonLabel,IonBadge,  IonSegmentContent, IonSegmentView , IonSegment, IonSegmentButton, IonItem,IonIcon, IonList, IonTitle, IonToolbar,IonButtons, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoInstagram } from 'ionicons/icons'; 
@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonLabel, IonSegment, IonSegmentContent, IonSegmentView,  IonSegmentButton, IonIcon, IonItem,IonBadge,IonList, IonToolbar, CommonModule, FormsModule,IonButtons, IonButton, RouterModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class SobrePage implements OnInit {
  public selectedSegment = 'default';


  constructor() { 
     addIcons({ logoInstagram });
  }
  
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  ngOnInit() {
  }

}
