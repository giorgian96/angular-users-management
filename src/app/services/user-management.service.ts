import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User';
import { Observable } from 'rxjs';
import { JsonLoginResponse } from '../models/JsonLoginResponse';

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {
    apiToken: string = JSON.parse(localStorage.getItem('json-response')).data.api_token;
    apiUrl: string = 'http://laravel-users-management.test/api/';

    constructor(private http: HttpClient) { }

    // Add user
    addUser(user: User):Observable<any>{
        let url: string = `${this.apiUrl}user/create`;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            })
        };
        return this.http.post<any>(url, user, httpOptions);
    }

    // Get all users
    getUsers():Observable<any> {
        let url: string = `${this.apiUrl}users`; // this will get all users
        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.apiToken}`
            })
        };
        return this.http.get<any>(url, httpOptions);
    }

    // Get single user
    getUser(id: number): Observable<any>{
        let url: string = `${this.apiUrl}user/${id}`;
        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.apiToken}`
            })
        };
        return this.http.get<any>(url, httpOptions);
    }

    // Update user
    updateUser(user: User):Observable<any>{
        let url: string = `${this.apiUrl}user/update/${user.id}`;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            })
        };
        return this.http.put<any>(url, user, httpOptions);
    }

    // Delete user
    deleteUser(user: User):Observable<User>{
        let url: string = `${this.apiUrl}user/delete/${user.id}`;
        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.apiToken}`
            })
        };
        return this.http.delete<User>(url, httpOptions);
    }
}
