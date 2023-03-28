import { Component } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  display:any;
  blogs:any;
  allusersData: any;
  constructor(private api:UsersDataService){
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
}
