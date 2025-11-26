import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';

interface LoginResponse {
    mensaje: string;
    token: string;
    usuario: Usuario;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:3000/api/usuarios'; // Ajusta la URL

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<LoginResponse> {
        const body = { email, password };

        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body).pipe(
            tap((res) => {
                localStorage.setItem('token', res.token);
                localStorage.setItem('usuario', JSON.stringify(res.usuario));
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUsuario(): Usuario | null {
        const data = localStorage.getItem('usuario');
        return data ? JSON.parse(data) : null;
    }

    // NUEVO: Verificar si es admin
    isAdmin(): boolean {
        const usuario = this.getUsuario();
        return usuario?.rol === 'admin';
    }

    // NUEVO: Verificar si es usuario normal
    isUsuario(): boolean {
        const usuario = this.getUsuario();
        return usuario?.rol === 'usuario';
    }

    register(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, data);
    }

}