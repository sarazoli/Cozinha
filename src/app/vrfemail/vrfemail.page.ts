import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verificacao',
  templateUrl: './vrfemail.page.html',
  styleUrls: ['./vrfemail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class VrfemailPage {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      codigo1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      codigo2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      codigo3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      codigo4: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });
  }

  moverProximo(event: any, proximo: HTMLInputElement) {
    if (event.target.value.length === 1 && proximo) {
      proximo.focus();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const codigo =
        this.form.value.codigo1 +
        this.form.value.codigo2 +
        this.form.value.codigo3 +
        this.form.value.codigo4;

      console.log('Código digitado:', codigo);
      /*enviar o codigo para validaçao no backend*/
    } else {
      console.log('Formulário inválido');
    }
  }
}
