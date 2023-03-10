import { usersData } from './../admin/admin.modal';
import { Component } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users:any;
  constructor(private usersData:UsersDataService){
    usersData.users().subscribe((data)=>{
      console.warn("data",data);
      this.users=data
    })
  }
    
  }
