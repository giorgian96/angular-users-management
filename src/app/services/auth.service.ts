import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { JsonResponse } from '../models/JsonResponse';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiUrl: string = 'http://laravel-users-management.test/api';

    constructor(private http: HttpClient) { }

    public login(userLoginInfo: User): Observable<JsonResponse> {
        // Login code here
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        };
        return this.http.post<JsonResponse>(`${this.apiUrl}/login`, userLoginInfo, httpOptions);
    }

    public isLoggedIn() {
        // Check if user is logged in
    }

    public isAdmin() {
        // Check if user is an admin
    }

    public logout(apiToken: string): Observable<any> {
        // Logout code here
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            })
        };
        return this.http.post(`${this.apiUrl}/logout`, {}, httpOptions);
    }
}
