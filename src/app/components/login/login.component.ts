import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    isSubmitted = false;

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get formControls() {
        return this.loginForm.controls;
    }

    login() {
        let userLoginInfo: User = this.loginForm.value;
        this.isSubmitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.authService.login(userLoginInfo).subscribe(response => {
            localStorage.setItem("api_token", response.data.api_token);
            if (response.data.type == 'default') {
                this.router.navigateByUrl('/user');
            } else if (response.data.type == 'admin') {
                this.router.navigateByUrl('/admin');
            }
        });
    }
}
