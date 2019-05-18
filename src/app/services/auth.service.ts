import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { JsonLoginResponse } from '../models/JsonLoginResponse';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiUrl: string = 'http://laravel-users-management.test/api';

    constructor(private http: HttpClient) { }

    public login(userLoginInfo: User): Observable<JsonLoginResponse> {
        // Login code here
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        };
        return this.http.post<JsonLoginResponse>(`${this.apiUrl}/login`, userLoginInfo, httpOptions);
    }

    public getToken(): string {
        // Check if user is logged in
        if(localStorage.getItem('json-response') === null){
            // if there is no json response
            return "unauthenticated";
        }else{
            const apiToken = JSON.parse(localStorage.getItem('json-response')).data.api_token;
            return apiToken;
        }        
    }

    public getType(): string {
        // Check if user is an admin
        if(localStorage.getItem('json-response') === null){
            // if there is no json response
            return "unauthenticated";
        }else{
            const type = JSON.parse(localStorage.getItem('json-response')).data.type;
            return type;
        }        
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
