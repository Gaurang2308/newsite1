import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  user= "http://localhost:3000/users?status=user"
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
  blog="http://localhost:3000/Blogs"
  blogs()
  {
    return this.http.get(this.blog);
  }
  postblogs(data:any){
    return this.http.post<any>("http://localhost:3000/Blogs",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getblogs(){
    return this.http.get<any>("http://localhost:3000/Blogs").pipe(map((res:any)=>{
      return res;
    })) 
  }
  deleteblogs(id:number){
    return this.http.delete<any>("http://localhost:3000/Blogs"+"/"+id).pipe(map((res:any)=>{
      return res;
    })) 
  }
  updateblogs(data:any,username:string){
    return this.http.put<any>("http://localhost:3000/Blogs/"+username,data).pipe(map((res:any)=>{
      return res;
    })) 
  }
  GetblogById(code:any){
    return this.http.get('http://localhost:3000/Blogs/?Username='+`${code}`);
  }
  deleteBlgs(id:number){
    return this.http.delete<any>("http://localhost:3000/Blogs/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
    
}
