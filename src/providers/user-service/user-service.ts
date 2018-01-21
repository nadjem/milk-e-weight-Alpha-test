import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  apiRoot: string = "http://mejdan.fr/api";
  urlLogin = `${this.apiRoot}/feeding/account/cookie/login`;
  urlAddSecondary = `${this.apiRoot}/user/feeding/add/user/secondary`;
  urlSetAdmin = `${this.apiRoot}/user/feeding/set/admin`;
  urlSetUser = `${this.apiRoot}/user/feeding/set/user`;
  urlSetUserAvatar = `${this.apiRoot}/user/feeding/set/user/avatar`;
  result;

  constructor(public http: HttpClient) {

  }

  /**
   * Login
   * @param credentials
   * @returns {any}
   */
  public user(credentials) {
    console.log('get user service');
    console.log(credentials);
    if (credentials.token === null) {
      console.log('user token null');
      return Observable.throw("Please insert credentials");
    }else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        this.http.post(this.urlLogin, {cookie:credentials}).subscribe(res =>{
          this.result=res;
          if(this.result.status === "ok"){
            console.log('user service ok');

            observer.next(this.result);
            observer.complete();

          }else if(this.result.status === "ko"){
            console.log('user service ko');
            sessionStorage.setItem("message","error loggin");
            observer.next(this.result);
          }

        });

      });
    }

  }
  public userAvatar(data){

    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!

      this.http.post(this.urlSetUserAvatar, {cookie:data}).subscribe(res =>{
        this.result=res;
        if(this.result.status === "ok"){
          console.log('user avatar service ok');

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('user avatar service ko');
          sessionStorage.setItem("message","error loggin");
          observer.next(this.result);
        }

      });

    });
  }

  public appendUser(credentials){
    console.log('append user service');
    console.log(credentials);

    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!

      this.http.post(this.urlAddSecondary, {data:credentials}).subscribe(res =>{
        this.result=res;
        if(this.result.status === "ok"){
          console.log('user service ok');

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('user service ko');
          sessionStorage.setItem("message","error loggin");
          observer.next(this.result);
        }

      });

    });

  }

  public setAdmin(credentials){
    console.log('set admin user service');
    console.log(credentials);
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!

      this.http.post(this.urlSetAdmin, {data:credentials}).subscribe(res =>{
        this.result=res;
        if(this.result.status === "ok"){
          console.log('user service ok');

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('user service ko');
          sessionStorage.setItem("message","error loggin");
          observer.next(this.result);
        }

      });

    });
  }

  public setUser(credentials){
    console.log('set admin user service');
    console.log(credentials);
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!

      this.http.post(this.urlSetUser, {data:credentials}).subscribe(res =>{
        this.result=res;
        if(this.result.status === "ok"){
          console.log('user service ok');

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('user service ko');
          sessionStorage.setItem("message","error loggin");
          observer.next(this.result);
        }

      });

    });
  }

}
