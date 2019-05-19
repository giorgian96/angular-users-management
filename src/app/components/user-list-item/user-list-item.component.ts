import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserManagementService} from '../../services/user-management.service';

import { User } from 'src/app/models/User';

@Component({
    selector: 'app-user-list-item',
    templateUrl: './user-list-item.component.html',
    styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
    @Input() user: User;
    @Output() deleteUser: EventEmitter<User> = new EventEmitter();

    constructor(private userManagementService: UserManagementService) { }

    ngOnInit() {
    }

    onDelete(user: User){
        this.deleteUser.emit(user);
    }

}
