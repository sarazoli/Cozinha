export const environment = {
  production: false, // 👈 'false' para desenvolvimento
  firebase: {
    apiKey: "AIzaSyCLacJ3-ir_tbjicwdRT4wLI96mm00aOsg",
    authDomain: "cozinhav1.firebaseapp.com",
    projectId: "cozinhav1",
    storageBucket: "cozinhav1.firebasestorage.app",
    messagingSenderId: "853322412687",
    appId: "1:853322412687:web:bb41664aee4f88b47376fa",
    
  },

  // ⭐️ API URL FICA AQUI (FORA DO FIREBASE) ⭐️
  apiUrl: '/spoonacular-api' // 👈 O caminho do proxy
};