import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Session } from "../models/session";
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(data:any): Promise<any> {
      delete data.rememberme;
      return this.http.post<any>(environment.apiBase + "login",data).toPromise().then(data=>{
        var session:any = {};
        session.token = data.token;
        session.user = {};
        session.user.id = data.user.id;
        session.user.name = data.user.name;
        localStorage.setItem("SessionUser",JSON.stringify(session));
      });
    }

    register(data:any): Promise<any>{
      delete data.checkPassword;
      return this.http.post<any>(environment.apiBase + "register",data).toPromise().then(data=>{
        var session:any = {};
        session.token = data.token;
        session.user = {};
        session.user.id = data.user.id;
        session.user.name = data.user.name;
        localStorage.setItem("SessionUser",JSON.stringify(session));
        return data;
      });
    }

    logout(){
      this.http.post(environment.apiBase + "logout",null).subscribe(data=>{
        localStorage.removeItem("SessionUser");
        return true;
      },error=>{
        return false;
      });
    }

    isAuthenticated(): Promise<any> {
      return this.http.post(environment.apiBase + "isAuthenticated",null).toPromise();
    }

    userValue():any{
      return JSON.parse(localStorage.getItem("SessionUser")!);
    }
}
