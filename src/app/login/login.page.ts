import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoFacebook, logoGoogle, logoApple } from 'ionicons/icons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonInput, IonLabel, IonItem, IonText,} from '@ionic/angular/standalone';
import { AuthStateService } from '../services/auth-state';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon,
    IonInput, IonLabel, ReactiveFormsModule, RouterModule, IonItem, IonText,
  ]
})
export class LoginPage {
  form!: FormGroup;
  error = '';
  loading: boolean = false;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthStateService);

  constructor() {
    addIcons({ logoFacebook, logoGoogle, logoApple });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  // =======================================================
  // FUNÇÕES DE AUTENTICAÇÃO SOCIAL (ADICIONADO)
  // =======================================================

  async loginComGoogle() {
    this.loading = true;
    try {
      await this.authService.signInWithGoogle(); // Chama o método do serviço
      await this.router.navigate(['/homepage']); 
    } catch (e: any) {
      console.error('Erro no login com Google:', e);
      this.error = 'Não foi possível fazer login com o Google.';
    } finally {
      this.loading = false;
    }
  }

  async loginComFacebook() {
    this.loading = true;
    try {
      await this.authService.signInWithFacebook(); // Chama o método do serviço
      await this.router.navigate(['/homepage']);
    } catch (e: any) {
      console.error('Erro no login com Facebook:', e);
      this.error = 'Não foi possível fazer login com o Facebook.';
    } finally {
      this.loading = false;
    }
  }

  // =======================================================
  // FUNÇÃO DE AUTENTICAÇÃO PADRÃO (EMAIL/SENHA)
  // =======================================================

  async onLogin() {
    this.error = '';
    this.form.controls['email'].setErrors(null);
    this.form.controls['senha'].setErrors(null);
    this.loading = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loading = false;
      return;
    }

    const { email, senha } = this.form.value;

    try {
      const userId = await this.authService.signInWithEmailAndSetUser(email, senha);
      console.log('Usuário logado:', userId);
      
      await this.router.navigate(['/homepage']); 
      
    } catch (e: any) {
      console.error('Erro de login:', e);

      switch (e.code) {
        case 'auth/wrong-password':
          this.form.controls['senha'].setErrors({ server: 'Senha incorreta. Tente novamente.' });
          break;
        case 'auth/user-not-found':
          this.form.controls['email'].setErrors({ server: 'Usuário não encontrado.' });
          break;
        case 'auth/invalid-email':
          this.form.controls['email'].setErrors({ server: 'Email inválido.' });
          break;
        case 'auth/too-many-requests':
          this.error = 'Muitas tentativas. Tente novamente mais tarde.';
          break;
        case 'auth/invalid-credential':
        case 'auth/user-not-found': // Duplicado, mas mantém o tratamento de erro
          this.error = 'Email ou senha incorretos.';
          break;
        default:
          this.error = 'Erro ao fazer login. Tente novamente.';
          break;
      }
    } finally {
        this.loading = false;
    }
  }
}