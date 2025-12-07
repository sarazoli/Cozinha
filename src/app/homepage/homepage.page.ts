import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, IonModal } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  

import { ReceitasService } from '../receitas';
import { Router, RouterLink } from '@angular/router';

// IMPORTAÇÕES DO SCANNER
import { Camera, CameraResultType } from '@capacitor/camera';
import { HuggingfaceService } from '../services/huggingface.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],

  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule    
  ]
})
export class HomepagePage implements OnInit {

  // 👉 CORRIGIDO: remove o static (não precisa)
  @ViewChild('scannerModal') scannerModal!: IonModal;

  todasReceitas: any[] = [];
  receitasFiltradas: any[] = [];
  termoBusca: string = '';
  carregando: boolean = false;

  resultadoScanner: string = '';

  constructor(
    private receitasService: ReceitasService,
    private router: Router,
    private hf: HuggingfaceService,      
    private alert: AlertController       
  ) { }

  categorias = [
    { nome: 'Salgados', imagem: 'assets/icon/salgado 2.jpg' },
    { nome: 'Frutos do mar', imagem: 'assets/icon/peixes.jpg' },
    { nome: 'Sobremesas', imagem: 'assets/icon/tortinha.imagemhome.png' },
  ];

  ngOnInit(): void {
    this.carregarTodasReceitas();
  }

  abrirCategoria(nome: string) {
    this.router.navigate(['/resultados-categoria', nome]);
  }

  carregarTodasReceitas(): void {
    this.carregando = true;

    this.receitasService.buscarTodasReceitas().subscribe({
      next: (data: any[]) => {
        this.todasReceitas = data;
        this.receitasFiltradas = data;
        this.carregando = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao buscar receitas:', err);
        this.carregando = false;
      }
    });
  }

  verDetalhesReceita(id: string): void {
    if (id) {
      this.router.navigate(['/preparo', id]);
    } else {
      console.warn('ID da receita não encontrado para navegação.');
    }
  }

  filtrarReceitas(): void {
    if (!this.termoBusca || this.termoBusca.trim() === '') {
      this.receitasFiltradas = this.todasReceitas;
    } else {
      const termo = this.termoBusca.trim().toLowerCase();

      this.receitasFiltradas = this.todasReceitas.filter(receita => {
        const nomeParaFiltrar = receita.titulo || receita.nome || receita.title || '';
        return typeof nomeParaFiltrar === 'string' && nomeParaFiltrar.toLowerCase().includes(termo);
      });
    }
  }

  // 👉 GARANTE QUE O MODAL ABRE SEM ERRO
  async abrirScanner() {
    if (this.scannerModal) {
      await this.scannerModal.present();
    }
  }

  // 👉 GARANTE QUE O MODAL FECHA SEM ERRO
  fecharScanner() {
    if (this.scannerModal) {
      this.scannerModal.dismiss();
    }
  }

  async scan() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        quality: 80
      });

      const base64 = photo.base64String!;

      this.hf.reconhecerAlimento(base64).subscribe({
        next: async (res: any) => {

          if (!res || res.length === 0) {
            this.resultadoScanner = "Não consegui identificar o alimento.";
            return;
          }

          this.resultadoScanner = res[0].label;
        },
        error: async () => {
          this.resultadoScanner = "Erro ao reconhecer o alimento.";
        }
      });

    } catch (error) {
      this.resultadoScanner = "Erro ao abrir a câmera.";
    }
  }

  async mostrar(msg: string) {
    const alert = await this.alert.create({
      header: "Scanner",
      message: msg,
      buttons: ["OK"]
    });
    alert.present();
  }

  buscarReceitas(alimento: string) {
    this.router.navigate(['/busca'], {
      queryParams: { termo: alimento }
    });
  }

}
