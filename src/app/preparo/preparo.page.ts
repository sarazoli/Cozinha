// src/app/preparo/preparo.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { ReceitasService } from '../receitas';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';


@Component({
    selector: 'app-preparo',
  
  templateUrl: './preparo.page.html', 
  styleUrls: ['./preparo.page.scss'], 
  standalone: true,
  imports: [CommonModule,
     FormsModule, IonicModule
  ]
})
export class PreparoPage implements OnInit { // Use o nome da sua classe
  activeTab: string = 'ingredientes'; // Define 'ingredientes' como a aba inicial
  receita: any = null; // Variável para armazenar os detalhes
  carregando: boolean = true;
  
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private receitasService: ReceitasService
  ) {

    
    
   }
     setActiveTab(event: any) {
    // Pegar o valor do evento para evitar o erro de tipo
    if (event.detail.value) {
      this.activeTab = event.detail.value;
}}

  ngOnInit(): void {
    // Escuta mudanças na URL para pegar o ID
    this.route.params.subscribe(params => {
      const receitaId = params['id']; // Pega o valor do parâmetro ':id'
      if (receitaId) {
        this.carregarDetalhes(receitaId);
      }
    });
  }
  voltar() {
  if (window.history.length > 1) {
    this.navCtrl.back(); 
  } else {
    this.navCtrl.navigateRoot('/homepage');
  }
}

  
carregarDetalhes(id: string): void {
  this.carregando = true;

  this.receitasService.buscarReceitaPorId(id).subscribe({
    next: (data) => {
      console.log("Detalhes carregados:", data);

      this.receita = data.find((r: any) => r.id == id);

      this.carregando = false;
    },
    error: (err) => {
      console.error('Erro ao carregar detalhes da receita:', err);
      this.carregando = false;
      this.receita = null;
    }
  });
}}
