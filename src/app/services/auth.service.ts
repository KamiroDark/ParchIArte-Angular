import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
    mensaje: string;
    token: string;
    usuario: {
        _id?: string;   // por si viene como _id
        id?: string;
        nombre: string;
        email: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = '/api/usuarios';

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

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUsuario(): any | null {
        const data = localStorage.getItem('usuario');
        return data ? JSON.parse(data) : null;
    }

    register(data: any) {
        return this.http.post(`${this.apiUrl}`, data);
    }

}
