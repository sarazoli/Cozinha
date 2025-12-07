import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withHashLocation } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment'; 

// Ícones
import { addIcons } from 'ionicons';
import { restaurantOutline, bookmarkOutline, searchOutline, settingsOutline, scanOutline, arrowUndoOutline } from 'ionicons/icons'; // Adicionei 'arrowUndoOutline'

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// 👇👇 1. IMPORTE O REGISTRO DO SWIPER AQUI 👇👇
import { register } from 'swiper/element/bundle';

if (environment.production) {
  enableProdMode();
}

// Adiciona os ícones (adicionei o 'arrow-undo-outline' que o card usa)
addIcons({
  restaurantOutline,
  bookmarkOutline,
  searchOutline,
  settingsOutline,
  scanOutline,
  arrowUndoOutline // <-- Adicionado
});

// 👇👇 2. CHAME A FUNÇÃO DE REGISTRO AQUI (ANTES DO BOOTSTRAP) 👇👇
register();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withHashLocation()), 
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
});