import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../models/User';
import { UserManagementService } from '../../services/user-management.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    @Input() user: User;

    constructor(private route: ActivatedRoute, private userManagementService: UserManagementService, private location: Location) { }

    ngOnInit() {
        this.getUser();
    }

    getUser(){
        let id: number = +this.route.snapshot.paramMap.get('id');
        this.userManagementService.getUser(id).subscribe(response => {
            this.user = response.data;
        });
    }

    save(): void{
        this.userManagementService.updateUser(this.user).subscribe(() => {
            this.goBack();
        });
    }

    goBack(): void{
        this.location.back();
    }

}
