import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  user= "http://localhost:3000/users"
  constructor(private http:HttpClient) { }
  users()
  {
    return this.http.get(this.user);
  }
  postusers(data:any){
    return this.http.post<any>("http://localhost:3000/users",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getusers(){
    return this.http.get<any>("http://localhost:3000/users").pipe(map((res:any)=>{
      return res;
    })) 
  }
  deleteusers(id:number){
    return this.http.delete<any>("http://localhost:3000/users"+"/"+id).pipe(map((res:any)=>{
      return res;
    })) 
  }
}
