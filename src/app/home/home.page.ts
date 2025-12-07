import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ⬅️ O Router é essencial
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export default class HomePage implements OnInit {

  constructor(private router: Router, private authService: AuthService) {} 

  async ngOnInit() {
    const loggedIn = await this.authService.isAuthenticated();

    if (loggedIn) {
      // Se já estiver logado, redireciona para a área principal do app
      this.router.navigateByUrl('/categorias', { replaceUrl: true });
    }
    // Se não estiver logado, o usuário permanece nesta página para ver as opções
  }

  //1. Método para navegar para a tela de Login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  //2. Método para navegar para a tela de Cadastro
  goToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  //3. Método para continuar como Visitante (Guest)

}

