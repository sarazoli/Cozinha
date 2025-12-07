import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// 🚨 MANTENHA O CAMINHO CORRETO AQUI (Vou assumir '../receitas/receitas.service')
import { ReceitasService } from '../receitas'; 
import { FormsModule } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// Interfaces (Mantenha as interfaces aqui, mas certifique-se de que Receita está correta)
interface Receita {
  id?: string;
  _id?: string;
  recipeId?: string;
  nome: string;
  imagem: string;
  tempoPreparo: string;
  porcoes: number;
}

interface Categoria {
  nome: string;
  palavrasChave: string[];
}

@Component({
  selector: 'app-resultados-categoria', 
  templateUrl: './resultados-categoria.page.html',
  styleUrls: ['./resultados-categoria.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class ResultadosCategoriaPage implements OnInit { 
  categoriaAtiva: string = '';
  receitasFiltradas$: Observable<Receita[]> = of([]);
  carregando: boolean = true;
  
  categoriasLista: Categoria[] = [
    { nome: 'Todas', palavrasChave: [] }, 
    { nome: 'Sobremesas', palavrasChave: ['bolo', 'doce', 'pudim', 'mousse', 'torta', 'brigadeiro', 'sobremesa', 'manjar', 'pave', 'Beijinho', 'Pamonha','coco'] },
    { nome: 'Salgados', palavrasChave: ['salgado', 'coxinha', 'pastel', 'empada', 'pão', 'esfiha', 'carne', 'frango', 'peixe', 'farofa', 'paulista', 'cuscuz','feijoada' ,'carreteiro'] },
    { nome: 'Fitness', palavrasChave: ['fit', 'light', 'saudavel', 'salada', 'legumes', 'verde', 'integral', 'iogurte'] },
    { nome: 'Massas', palavrasChave: ['macarrao', 'lasanha', 'nhoque', 'massa', 'pasta'] },
    { nome: 'Frutos do mar', palavrasChave: ['peixe', 'acarajé', 'salmão', ' bacalhau', 'camarão'] },
   
  ];

  constructor(
    private route: ActivatedRoute,
    private receitasService: ReceitasService,
    private router: Router
  ) {}

  ngOnInit() {
    // 1. Pega o parâmetro da URL (o nome da categoria)
    this.receitasFiltradas$ = this.route.params.pipe(
      tap(params => {
        this.carregando = true;
        // Pega o nome da categoria da URL, ou usa 'Todas' como fallback
        this.categoriaAtiva = params['categoriaNome'] || 'Todas'; 
      }),
      // 2. Troca o stream de parâmetros pelo stream de todas as receitas
      // Usa o 'getTodasReceitas()' do seu service que gerencia o cache
      switchMap(params => this.receitasService.buscarTodasReceitas()),
      // 3. Faz o filtro na lista de receitas
      map(receitas => {
        const categoria = this.categoriasLista.find(c => c.nome === this.categoriaAtiva);
        
        if (!categoria || categoria.nome === 'Todas') {
          // Se for "Todas" ou categoria não encontrada, retorna todas as receitas
          this.carregando = false;
          return receitas;
        }

        const keywords = categoria.palavrasChave;
        
        const resultados = receitas.filter(receita => {
          // Verifica se o nome da receita contém alguma das palavras-chave
          const nomeReceita = (receita.nome || '').toLowerCase();
          return keywords.some(keyword => nomeReceita.includes(keyword));
        });
        
        console.log(`Filtro "${this.categoriaAtiva}": ${resultados.length} receitas encontradas.`);
        this.carregando = false;
        return resultados;
      })
    );
  }
  // Função adicionada para navegar para a página inicial
    irParaHome() {
        // Navega para a rota '/home' conforme definido em app.routes.ts
        this.router.navigate(['/homepage']);
    }

  verDetalhesReceita(id: string | undefined) {
    if (id) {
        // Redireciona para a página de preparo
        this.router.navigate(['/preparo', id]);
    } else {
        console.error('ID da receita não encontrado para navegação.');
    }
  }
}