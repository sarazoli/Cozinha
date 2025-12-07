import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


// Firebase
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule ],
})
export class CadastroPage {

  

  

  private auth = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private firestore = inject(Firestore);

  form: FormGroup;
  error: string = '';

  

  constructor() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
     celular: [
  '',
  [
    Validators.required,
    Validators.pattern(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/)
  ]
],

      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmacaoSenha: ['', Validators.required],
    });
  }

  get celular() {
  return this.form.get('celular');
}

  async onSubmit() {
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Verifica se as senhas conferem
    if (this.form.value.senha !== this.form.value.confirmacaoSenha) {
      this.form.get('confirmacaoSenha')?.setErrors({ mismatch: true });
      return;
    }

    const { nome, celular, email, senha } = this.form.value;

    try {
      // Cria usuário no Auth
      const credential = await createUserWithEmailAndPassword(this.auth, email, senha);
      const userId = credential.user.uid;

      // Salva dados no Firestore
      await setDoc(doc(this.firestore, `users/${userId}`), {
        nome,
        celular,
        email,
        data_cadastro: new Date(),
      });

      // Redireciona
      await this.router.navigateByUrl('/home');

    } catch (e: any) {

      if (e.code === 'auth/email-already-in-use') {
        this.error = 'Este e-mail já está em uso.';
      } else if (e.code === 'auth/invalid-email') {
        this.error = 'Por favor, insira um e-mail válido.';
      } else if (e.code === 'auth/weak-password') {
        this.error = 'A senha deve ter pelo menos 6 caracteres.';
      } else {
        this.error = 'Falha ao cadastrar. Tente novamente.';
      }

      console.error('Erro de Cadastro:', e);
    }
  }
}
