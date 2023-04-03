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
  editform!:FormGroup;
  user:any
  allusersData:any
  users:any
  blogid:any;
  isTableVisible = false;
  isTable1Visible = false;
  usersModalObj : usersData = new usersData;
  blogs: any;
display: any;
data: any;
reloadPage() {
  location.reload();
}
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
      title:[''],
      discription:[''],
      url:['']

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
  
    showTable() {
      this.isTableVisible = true;
      this.isTable1Visible=false;
    }

    showTable1() {
      this.isTable1Visible = true;
      this.isTableVisible=false;
      
    }
    delBlogs(data: any) {
      this.api.deleteBlgs(data.id).subscribe(res => {
        console.log(res);
        alert("Data deleted");
        this.formvalue.reset();
      })
    }

    OnEditBlogs(data:any){
     
      this.blogid=data.id
      console.log(data);
      this.formvalue.controls['username'].setValue(data.Username)
      this.formvalue.controls['title'].setValue(data.title)
      this.formvalue.controls['discription'].setValue(data.discription)
      this.formvalue.controls['url'].setValue(data.url)
  }

  UpdateBlog(data:any){
    console.log("updated",data);
    
    // this.blogModelobj.title = this.formvalue.value.title;
    // this.blogModelobj.discription = this.formvalue.value.discription;
    // this.blogModelobj.url = this.formvalue.value.url;
    this.api.updateblogs(data,this.blogid).subscribe(res=>{
      console.log(res);
      
      alert("record updated successfully")
      this.formvalue.reset();
      this.reloadPage();
    });
  }
  }

