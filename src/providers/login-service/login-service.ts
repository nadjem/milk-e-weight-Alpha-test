import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {
  apiRoot: string = "http://mejdan.fr/api";
  urlLogin = `${this.apiRoot}/feeding/account/login`;
  setRoleUrl = `${this.apiRoot}/feeding/account/role`;
  newUserUrl = `${this.apiRoot}/feeding/account/new`;
  addUserUrl = `${this.apiRoot}/user/feeding/add/user/secondary`;

  result;

  constructor(public http: HttpClient) {
  }

  public login(credentials) {

    console.log('login service');
    console.log(credentials.rememberMe);
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        this.http.post(this.urlLogin, {mail:credentials.email ,password:credentials.password}).subscribe(res =>{
          this.result=res;

          if(this.result.status === "ok"){
            console.log('login service ok');
          console.log(this.result);
            sessionStorage.setItem("message","success loggin");
            sessionStorage.setItem("token",this.result.token);

            observer.next(this.result);
            observer.complete();
            let date = new Date();

            date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
            let expires = "; expires=" + date.toUTCString();
            document.cookie = "user=" + this.result.user._id + ";expires=" + expires + ";";
            document.cookie = "loggedAs=" + this.result.userLogged.userAssistUserName + ";expires=" + expires + ";";
            document.cookie = "isAdmin=" + this.result.userLogged.isAdmin + ";expires=" + expires + ";";
            document.cookie = "token=" + this.result.token + ";expires=" + expires + ";";

            if(credentials.rememberMe === true) {
              let date = new Date();
              date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
              let expires = "; expires=" + date.toUTCString();
              document.cookie = "tokenAuto=" + this.result.token + ";expires=" + expires + ";";
              }

          }else if(this.result.status === "ko"){
            console.log('login service ko');
            sessionStorage.setItem("message","error loggin");
            observer.next(this.result);
          }


        });

      });
    }
  }

  public register(credentials){
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!


      this.http.post(this.newUserUrl, {users:credentials}).subscribe(res =>{
        this.result=res;

        if(this.result.status === "ok"){
          console.log('create user service ok');
          console.log(this.result);

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('login service ko');
          observer.next(this.result);
        }


      });

      this.http.post(this.addUserUrl, {users:credentials}).subscribe(res =>{
        this.result=res;

        if(this.result.status === "ok"){
          console.log('create user service ok');
          console.log(this.result);

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('login service ko');
          observer.next(this.result);
        }


      });

    });
  }
  public setRole(){
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
let userNameCred = this.readCookie('loggedAs');

      this.http.post(this.setRoleUrl, {userName:userNameCred}).subscribe(res =>{
        this.result=res;

        if(this.result.status === "ok"){
          console.log('set role service ok');
          console.log(this.result.isAdmin);

          observer.next(this.result);
          observer.complete();
          let date = new Date();
          date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
          let expires = "; expires=" + date.toUTCString();
          document.cookie = "isAdmin=" + this.result.isAdmin + ";expires=" + expires + ";";

        }else if(this.result.status === "ko"){
          console.log('login service ko');
          observer.next(this.result);
        }


      });

    });
  }
  readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

}
