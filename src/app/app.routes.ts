// src/app/app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'splash',
        pathMatch: 'full',
    },

    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.default)
    },

    {
        path: 'splash',
        loadComponent: () => import('./splash/splash.page').then(m => m.default)
    },

    {
        path: 'favoritos',
        loadComponent: () => import('./favoritos/favoritos.page').then(m => m.FavoritosPage)
    },
    {
        path: 'conta',
        loadComponent: () => import('./conta/conta.page').then(m => m.ContaPage)
    },

    {
        path: 'login',
        loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./cadastro/cadastro.page').then(m => m.CadastroPage)
    },

    {
        path: 'config',
        loadComponent: () => import('./config/config.page').then(m => m.ConfigPage)
    },
    {
        path: 'termos',
        loadComponent: () => import('./termos/termos.page').then(m => m.TermosPage)
    },
    {
        path: 'esqueci-senha',
        loadComponent: () => import('./esqueci-senha/esqueci-senha.page').then(m => m.EsqueciSenhaPage)
    },

    {
        path: 'homepage',
        loadComponent: () => import('./homepage/homepage.page').then(m => m.HomepagePage)
    },
    {
        path: 'preparo/:id',
        loadComponent: () => import('./preparo/preparo.page').then(m => m.PreparoPage)
    },
    {
        path: 'resultados-categoria/:categoriaNome',
        loadComponent: () => import('./resultados-categoria/resultados-categoria.page').then(m => m.ResultadosCategoriaPage)
    },
    {
        path: 'busca',
        loadComponent: () => import('./busca/busca.page').then(m => m.BuscaPage)
    },
];
