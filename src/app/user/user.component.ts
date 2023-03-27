
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
 userName:any;
 showData:any;
 
 constructor(private dis:UsersDataService,private form:FormBuilder){
this.userName = sessionStorage.getItem('Username');
this.loadBlogs();
 }
 ngOnInit():void{
  this.formvalue=this.form.group({
    Username:this.userName,
    title:[''],
    discription:[''],
    url:['']

  })
   }
   loadBlogs(){
    this.dis.GetblogById(this.userName).subscribe((display)=>{
      this.GetBlog=display;
      console.warn(display);
    });
   }

addblog(){
  this.blogModelobj.title = this.formvalue.value.title;
  this.blogModelobj.discription = this.formvalue.value.discription;
  this.blogModelobj.url = this.formvalue.value.url;
  this.blogModelobj.Username= this.userName;
  console.log(this.formvalue.value)
  this.dis.postblogs(this.formvalue.value).subscribe(res=>{
    console.log(this.formvalue.value);
    this.data = res;
  })

}


}
