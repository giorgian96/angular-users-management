import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { JsonResponse } from 'src/app/models/JsonResponse';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    logout() {
        this.authService.logout(localStorage.getItem("api_token")).subscribe(response => {
            localStorage.removeItem("api_token");
            if (response.message == "Logout successful") {
                this.router.navigateByUrl('/login');
            }
        });
    }
}
