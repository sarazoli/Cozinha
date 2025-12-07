# Cozinha!

Cozinha! é um aplicativo mobile desenvolvido com **Ionic + Angular** e integrado ao **Firebase**, projetado para facilitar a descoberta de receitas. Ele permite buscar pratos, navegar por categorias e usar a câmera para identificar alimentos, sugerindo receitas compatíveis.

---

## Integrantes

- Sara Oliveira  
- Ana Carolyna  
- Caio Pita  

---

## Objetivo

Ajudar usuários a encontrar receitas a partir de imagens de alimentos, promovendo praticidade, redução de desperdício e incentivo à criatividade na cozinha.

---

## Funcionalidades

- Identificação de alimentos via **câmera (Scan)** usando a **API HuggingFace**  
- Sugestão de receitas através da **API própria [Cozinha](https://github.com/CarolynaCosta/Cozinha-API)**  
- Autenticação segura com Firebase (e-mail/senha e Google)  
- Pesquisa e navegação por categorias de receitas  

---

## Estrutura do App

Principais telas:

- Splash / Tela Inicial / Login / Cadastro / Esqueci a Senha  
- Home (categorias + receitas aleatórias)  
- Página de Receita (ingredientes + modo de preparo)  
- Pesquisar  
- Scan (câmera)  
- Configurações  

---

## Recursos Nativos

- **Câmera**: `@capacitor/camera` usada para capturar fotos e identificar alimentos no Scan  
- **Firebase Authentication** e **Firestore** para usuários e receitas  

---

## Consumo de APIs

1. **API HuggingFace**: identifica o alimento na foto  
2. **API própria Cozinha**: retorna receitas relacionadas ao alimento identificado  


### ⚠️ Aviso

O recurso de **Scan** depende da HuggingFace. A chave **não está no repositório**, então:

- Vá em services/Huggingface.services

  private apiKey = 'Sua-chave-aqui';


