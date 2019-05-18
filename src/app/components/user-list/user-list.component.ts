import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';

import { User } from '../../models/User';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: User[];

    constructor(private userManagementService: UserManagementService) { }

    ngOnInit() {
        this.userManagementService.getUsers().subscribe(response => {
            this.users = response.data;
        });
    }

    deleteUser(user: User){
        // Delete from the UI
        this.users = this.users.filter(u => u.id !== user.id);
        // Delete from server
        this.userManagementService.deleteUser(user).subscribe(response => {
            console.log(response);
        });
    }

    addUser(user: User){
        this.userManagementService.addUser(user).subscribe(response => {
            this.users.push(response.data);
        });
    }

}
