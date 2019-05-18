import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { JsonLoginResponse } from 'src/app/models/JsonLoginResponse';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    userData: JsonLoginResponse;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('json-response'));
    }

    logout() {
        this.authService.logout(this.userData.data.api_token).subscribe(response => {
            localStorage.removeItem("json-response");
            if (response.message == "Logout successful") {
                this.router.navigateByUrl('/login');
            }
        });
    }
}
