import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  display:any;
  blogs:any;
  allusersData: any;
  constructor(private route:Router,private api:UsersDataService){
    api.blogs().subscribe((display)=>
    {
      // console.warn("display",display)
      console.log(display);
      this.blogs=display;
    }
    );
    api.users().subscribe((data)=>{
    console.warn("data",data);
    this.allusersData=data;
  });
  }
  loginpage(){
    this.route.navigate(['login']);
  }
  
}
