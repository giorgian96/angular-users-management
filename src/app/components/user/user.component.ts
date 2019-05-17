import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { JsonResponse } from 'src/app/models/JsonResponse';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    // userData: JsonResponse;

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
