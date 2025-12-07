import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../receitas';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink} from '@angular/router';


interface Receita {
  id: string;
  nome: string;
  imagem: string;
}

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,]
})
export class BuscaPage implements OnInit {

  resultados: Receita[] = [];
  todasReceitas: Receita[] = [];
  carregando = false;
  termoBusca = '';

  private buscaSubject = new Subject<string>();

  constructor(private receitasService: ReceitasService ,private router: Router) {}

  ngOnInit() {

    // Carrega todas as receitas uma única vez
    this.receitasService.buscarTodasReceitas().subscribe((dados) => {
      this.todasReceitas = dados;
    });

    this.setupBusca();
  }

  setupBusca() {
    this.buscaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(termo => {
        this.termoBusca = termo;

        if (!termo || termo.trim() === '') {
          this.carregando = false;
          return of([]);
        }

        this.carregando = true;

        const filtradas = this.todasReceitas.filter(r =>
          r.nome.toLowerCase().includes(termo.toLowerCase())
        );

        return of(filtradas);
      })
    ).subscribe({
      next: dados => {
        this.resultados = dados;
        this.carregando = false;
      },
      error: err => {
        console.error('Erro:', err);
        this.resultados = [];
        this.carregando = false;
      }
    });
  }

  onSearchChange(event: any) {
    const termo = event.target.value.toLowerCase().trim();
    this.buscaSubject.next(termo);
  }

  onSearchClear() {
    this.resultados = [];
    this.termoBusca = '';
  }

verDetalhesReceita(id: string): void {
    if (id) {
      // Navega para a rota configurada, passando o ID
      this.router.navigate(['/preparo', id]); 
      console.log('Navegando para detalhes da receita com ID:', id);
    } else {
      console.warn('ID da receita não encontrado para navegação.');
    }
  }
}
