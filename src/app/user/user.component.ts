
import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { FormGroup,FormBuilder, FormControl} from '@angular/forms';
import { blogData } from './user.model'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:any;

  formvalue!: FormGroup;
 blogModelobj:blogData=new blogData;
 GetBlog:any;
 data:any;
 username:any;
 constructor(private dis:UsersDataService,private form:FormBuilder){
this.username = sessionStorage.getItem('username')
 }
 ngOnInit():void{
  this.formvalue=this.form.group({
    username:this.username,
    title:[''],
    discription:[''],
    url:['']

  })
   }
   loadBlogs(){
    this.dis.GetblogById(this.username).subscribe((display)=>{
      this.GetBlog=display;
      console.warn(display);
    });
   }

addblog(){
  this.blogModelobj.username= this.username;
  this.blogModelobj.title = this.formvalue.value.title;
  this.blogModelobj.discription = this.formvalue.value.discription;
  this.blogModelobj.url = this.formvalue.value.url;
  
  this.dis.postblogs(this.formvalue.value).subscribe(res=>{
    console.log(this.formvalue.value);
    this.data = res;
  })

}

}
