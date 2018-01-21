import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the FeedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeedProvider {
  apiRoot: string = "http://mejdan.fr/api";
  urlNewFeed = `${this.apiRoot}/user/feeding/new`;
  urlAllDayFeed = `${this.apiRoot}/user/feeding/all`;
  urlAllDayBottleFeed = `${this.apiRoot}/user/feeding/all/bottle`;
  urlAllDayBreastFeed = `${this.apiRoot}/user/feeding/all/breast`;
  urlDeleteFeed = `${this.apiRoot}/user/feeding/delete/one`;
  urlUpdateFeed = `${this.apiRoot}/user/feeding/update/one`;
  urlAllFeed = `${this.apiRoot}/user/feeding/allFeed`;
  result;

  constructor(public http: HttpClient) {
    console.log('Hello Feed Provider Provider');
  }
  public newfeed(credentials) {
    console.log('new feeds service');
    console.log(credentials);

   /* if (credentials.token === null) {
      console.log('user token null');
      return Observable.throw("Please insert credentials");
    }else {*/
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        this.http.post(this.urlNewFeed, {feed:credentials}).subscribe(res =>{
          this.result=res;
          if(this.result.status === "ok"){
            console.log('new feeds service ok');

            observer.next(this.result);
            observer.complete();

          }else if(this.result.status === "ko"){
            console.log('new feeds service ko');
            sessionStorage.setItem("message","error loggin");
            observer.next(this.result);
          }

        });

      });
    /*}
    */

  }

  public todayAll(credentials){

  return Observable.create(observer => {
    // At this point make a request to your backend to make a real check!

    this.http.post(this.urlAllDayFeed, {data:credentials}).subscribe(res =>{
      this.result=res;
      if(this.result.status === "ok"){
        console.log('all feeds service ok');

        observer.next(this.result);
        observer.complete();

      }else if(this.result.status === "ko"){
        console.log('all feeds service ko');
        sessionStorage.setItem("message","error loggin");
        observer.next(this.result);
      }

    });

  });
}

  public todayAllBottle(credentials){

    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!

      this.http.post(this.urlAllDayBottleFeed, {data:credentials}).subscribe(res =>{
        this.result=res;
        if(this.result.status === "ok"){
          console.log('all feeds service ok');

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('all feeds service ko');
          sessionStorage.setItem("message","error loggin");
          observer.next(this.result);
        }

      });

    });
  }
  public todayAllBreast(credentials){

    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!

      this.http.post(this.urlAllDayBreastFeed, {data:credentials}).subscribe(res =>{
        this.result=res;
        if(this.result.status === "ok"){
          console.log('all feeds service ok');

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('all feeds service ko');
          sessionStorage.setItem("message","error loggin");
          observer.next(this.result);
        }

      });

    });
  }

  public deleteFeed(credentials){

    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!

      this.http.post(this.urlDeleteFeed, {data:credentials}).subscribe(res =>{
        this.result=res;
        if(this.result.status === "ok"){
          console.log('delete feeds service ok');

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('delete feeds service ko');
          sessionStorage.setItem("message","error loggin");
          observer.next(this.result);
        }

      });

    });

  }

  public updateFeed(credentials){

    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!

      this.http.post(this.urlUpdateFeed, {data:credentials}).subscribe(res =>{
        this.result=res;
        if(this.result.status === "ok"){
          console.log('update feeds service ok');

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('update feeds service ko');
          sessionStorage.setItem("message","error update");
          observer.next(this.result);
        }

      });

    });

  }

  public AllFeed(credentials){

    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!

      this.http.post(this.urlAllFeed, {data:credentials}).subscribe(res =>{
        this.result=res;
        if(this.result.status === "ok"){
          console.log('all feeds service ok');

          observer.next(this.result);
          observer.complete();

        }else if(this.result.status === "ko"){
          console.log('all feeds service ko');
          sessionStorage.setItem("message","error loggin");
          observer.next(this.result);
        }

      });

    });
  }
}
