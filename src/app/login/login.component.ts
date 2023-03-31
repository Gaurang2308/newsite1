
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsersDataService } from '../services/users-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup
  status:any
  user:any;
  showData:any;
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router,private dis:UsersDataService ) {
    this.GetDetails();
   }
   GetDetails() {
    this.dis.users().subscribe((result) => {
      this.showData = result;
      console.log(this.showData);
    }
    )
  }
  ngOnInit(): void {
    this.loginform = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
      })
  }
  logIn() {
    this._http.get<any>("http://localhost:3000/users").subscribe(res=>{
       this.user= res.find((a:any)=>{
         return a.username === this.loginform.value.username && a.password === this.loginform.value.password  
        })
        
        if(this.user.status === "admin"){
       sessionStorage.setItem('user',JSON.stringify(this.user));
        alert("login successfully");
        this.loginform.reset();
        this.router.navigate(['admin'])
      }else if(this.user.status === "user"){
        
        sessionStorage.setItem('username',this.user.username);
        sessionStorage.setItem('user',JSON.stringify(this.user));
        alert("login user successfully");
        this.loginform.reset();
        this.router.navigate(['user']);
      }
      else{
        alert("user not found");
      }
    },err=>{
     alert("server side error");
    })
  }
}
  