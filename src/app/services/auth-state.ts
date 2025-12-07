import { Injectable, inject } from '@angular/core';
import {
    Auth,
    signInWithEmailAndPassword,
    // Alterando de volta para signInWithPopup para o fluxo de demonstração mais simples:
    signInWithPopup, 
    GoogleAuthProvider,
    FacebookAuthProvider,
    UserCredential,
} from '@angular/fire/auth'; 
import { Firestore, doc, getDoc, updateDoc, setDoc } from '@angular/fire/firestore'; 
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
    private auth = inject(Auth);
    private firestore = inject(Firestore);

    private _userId: string | null = null;
    private _userName = new BehaviorSubject<string>('');
    userName$ = this._userName.asObservable();

    constructor() {
        const cachedName = localStorage.getItem('userName');
        if (cachedName) {
            this._userName.next(cachedName);
        }
    }

    setUserId(id: string): void {
        this._userId = id;
    }

    getUserId(): string | null {
        return this._userId;
    }

    setUserName(name: string | null): void {
        if (name) {
            this._userName.next(name);
            localStorage.setItem('userName', name); 
        }
    }

    getUserName(): string | null {
        return this._userName.value || null;
    }

    // =======================================================
    // AUTENTICAÇÃO COM GOOGLE
    // =======================================================
    async signInWithGoogle(): Promise<string> {
        const provider = new GoogleAuthProvider();
        provider.addScope('email'); 
        
        const cred: UserCredential = await signInWithPopup(this.auth, provider);
        const userId = cred.user.uid;

        this.setUserId(userId);
        // 🚨 CORREÇÃO 1: Passando o email obtido da credencial
        await this.ensureUserProfileExists(userId, cred.user.displayName, cred.user.email); 

        return userId;
    }

    // =======================================================
    // AUTENTICAÇÃO COM FACEBOOK
    // =======================================================
    async signInWithFacebook(): Promise<string> {
        const provider = new FacebookAuthProvider();
        provider.addScope('email');
        
        const cred: UserCredential = await signInWithPopup(this.auth, provider);
        const userId = cred.user.uid;

        this.setUserId(userId);
        // 🚨 CORREÇÃO 2: Passando o email obtido da credencial
        await this.ensureUserProfileExists(userId, cred.user.displayName, cred.user.email); 

        return userId;
    }
    
    // =======================================================
    // AUTENTICAÇÃO PADRÃO
    // =======================================================
    async signInWithEmailAndSetUser(email: string, senha: string): Promise<string> {
        const cred = await signInWithEmailAndPassword(this.auth, email, senha);
        const userId = cred.user.uid;
        this.setUserId(userId);

        const userDoc = await getDoc(doc(this.firestore, 'users', userId));
        if (userDoc.exists()) {
            const data = userDoc.data();
            this.setUserName(data['nome'] || null); // usa 'nome'
        }

        return userId;
    }

    // =======================================================
    // LÓGICA DE PERFIL (CORRIGIDA)
    // =======================================================
    private async ensureUserProfileExists(
        userId: string, 
        displayName: string | null, 
        // 🚨 CORREÇÃO 3: Aceitando o email como argumento
        socialEmail: string | null | undefined 
    ): Promise<void> {
        const userRef = doc(this.firestore, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            // Se o documento não existir (primeiro login social), cria um novo
            const userData = {
                nome: displayName || 'Novo Usuário',
                // ✅ CORRIGIDO: Usando o email passado do provedor, garantindo que não seja undefined
                email: socialEmail || null, 
            };
            // Nota: null é aceito pelo Firestore, undefined não.
            await setDoc(userRef, userData);
            this.setUserName(displayName || 'Novo Usuário');

        } else {
            // Se o documento existir, apenas atualiza o nome localmente
            const data = userDoc.data();
            this.setUserName(data['nome'] || data['displayName'] || null);
        }
    }


    async loadUserDataFromFirestore(): Promise<void> {
        if (!this._userId) return;

        const userDoc = await getDoc(doc(this.firestore, 'users', this._userId));
        if (userDoc.exists()) {
            const data = userDoc.data();
            this.setUserName(data['nome'] || null); // usa 'nome'
        }
    }

    async updateUserData(nome: string, numero: string, email: string, senha: string): Promise<void> {
        const userId = this.getUserId(); // Obtém o userId
        if (userId) {
            const userRef = doc(this.firestore, 'users', userId);
            const updatedData = { nome, numero, email, senha };

            await updateDoc(userRef, updatedData); // Atualiza os dados no Firestore

            // Atualiza o nome no AuthStateService
            this.setUserName(nome);
        }
    }

    logout(): void {
        this._userId = null;
        this.auth.signOut(); // Adicionando signOut do Firebase Auth
        this._userName.next('');
        localStorage.removeItem('userName');
    }
}