import { usersData } from './admin.modal'
import { FormGroup,FormBuilder} from '@angular/forms';
import { UsersDataService } from './../services/users-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  formvalue!: FormGroup
  user:any
  allusersData:any
  users:any
  
  usersModalObj : usersData = new usersData;
  blogs: any;
display: any;
  constructor(private formbuilder:FormBuilder,private api:UsersDataService){
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
  ngOnInit(): void {
     this.formvalue=this.formbuilder.group({
      name:[''],
      username:[''],
      password:[''],
      status:[''],
      blog:['']
     }) 
  }
  addusers(){
    this.usersModalObj.name = this.formvalue.value.name;
    this.usersModalObj.username = this.formvalue.value.username;
    this.usersModalObj.password = this.formvalue.value.password;
    this.usersModalObj.status = this.formvalue.value.status;
    this.usersModalObj.blog = this.formvalue.value.blog

    this.api.postusers(this.usersModalObj).subscribe(res=>{
      console.log(res);
      alert("user record added successfully")
      this.formvalue.reset()
      this.getallData();
     // sessionStorage.setItem('userdata',JSON.stringify(this.allusersData));
      
    })
  }
  getallData(){
    this.api.getusers().subscribe(res=>{
      this.allusersData = res;
    })
  }
  deleteuser(data:any){
    this.api.deleteusers(data.id).subscribe(res=>{
      alert("record delete successfully")
      this.getallData();
    })
  }
}
