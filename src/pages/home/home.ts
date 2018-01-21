import { Component, OnInit, ElementRef } from '@angular/core';

import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular'
import {LoginPage} from "../login/login";
import  {FeedProvider } from "../../providers/feed/feed";
import {FeedDetailPage} from "../feed-detail/feed-detail";
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

showAddBottle:boolean=false;
showAddBreast:boolean=false;
centi:number=0; // initialise les dixtièmes
secon:number=0;//initialise les secondes
minu:number=0;//initialise les minutes
compte;
time="00:00";
time2="00:00";

centi2:number=0; // initialise les dixtièmes
secon2:number=0;//initialise les secondes
minu2:number=0;//initialise les minutes
compte2;
rightBreastStarted:boolean=false;
leftBreastStarted:boolean=false;

data:any={};
dataBreast:any={};
feeds:any;
total:number  =0;
loginView = this.modalCtrl.create(LoginPage);

  constructor(public events:Events,public navCtrl: NavController,public modalCtrl: ModalController, private alertCtrl: AlertController,private elRef:ElementRef,private feed:FeedProvider,public loadingCtrl: LoadingController) {
    let loggedAs = this.readCookie('loggedAs');
    if(loggedAs){
      console.log('is logged');
      Observable.interval((1000 * 60) * 15 ).takeWhile(() => true).subscribe(() => this.update());
    }

    // this.listenEvents();
   // this.listenLogEvents()
    this.loginView.onDidDismiss(data => {

      this.getAllFeedRequest()
    });
  }

  listenEvents() {
    this.events.subscribe('reloadDetails', () => {
      this.getAllFeedRequest()
    });
  }
  listenLogEvents() {
    this.events.subscribe('loadData', () => {
      let userId_value = this.readCookie('user');
      this.data.user_id = userId_value;
      let now = new Date();
      let d = now.getDate();
      let mo = (((now.getMonth()+1) < 10 ? '0' : '') + (now.getMonth()+1)) ;
      let y = now.getFullYear();
      this.data.feedDate = d + "/" + mo + "/" + y;
      this.getAllFeedRequest()
    });
  }
  addBottleFeed(){
    this.showAddBottle = !this.showAddBottle;
  }
  addBreastFeed(){
    this.showAddBreast = !this.showAddBreast;
  }
public newFeeds(data:any){
  let loading = this.loadingCtrl.create({
    spinner: "circles",
    content: 'Please wait...'
  });

  loading.present();
      data.userId =this.readCookie('user');
      data.rightBreastData = 0;
      data.leftBreastData = 0;
      data.feedType = "bottle-feeding";

    if(!data.milkWeigh || data.milkWeigh < 1 ){
      this.showError('something missed',"please add feeding bottle quantity :)");
    }else {
      if (!data.dateType || data.dateType == false) {
        data.dateType = false;
        let now = new Date();
        let h = now.getHours();
        let m = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();


        let d = now.getDate();
        let mo = (((now.getMonth()+1) < 10 ? '0' : '') + (now.getMonth()+1)) ;

        let y = now.getFullYear();
        data.feedDate = d + "/" + mo + "/" + y;
        data.feedHour = h + ":" + m;
      } else {
        data.feedDate = this.elRef.nativeElement.querySelector('.datetime-text').innerHTML;
      }
      console.log(data);
      /**
       * request
       */

      this.feed.newfeed(data).subscribe(allowed => {
          if (allowed.status == "ok") {
            loading.dismiss();
            this.showOk("new feed added");
            this.getAllFeedRequest()

          } else {
            loading.dismiss();
            this.showError("error",'please retry an error occurred');
          }
        },
        error => {
          loading.dismiss();
          this.showError("error",'please retry an error occurred');
        });
    }
}


  showOk(text) {

    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  presentLoginView(){


  this.loginView.present();


  }

  ngOnInit() {

    /*let loggedAs = this.readCookie('loggedAs');
    if(!loggedAs){
      this.presentLoginView();
      console.log('isn\'t logged');
    }else{
      console.log('is logged');
      this.getAllFeedRequest()
    }*/

  }

  ionViewCanEnter(){

  }
  ionViewWillEnter(){
    let loggedAs = this.readCookie('loggedAs');
    if(!loggedAs){
      this.presentLoginView();
      console.log('isn\'t logged');
    }else{
      console.log('is logged');
      this.getAllFeedRequest()
    }
  }
    getAllFeedRequest(){
      let loading = this.loadingCtrl.create({
        spinner: "circles",
        content: 'Please wait...'
      });
      let userId_value = this.readCookie('user');
      let now = new Date();
      let d = (((now.getDate()+1) < 10 ? '0' : '') + (now.getDate()));
      if(d == "9"){
        d = "09";
      }else if(d == "8"){
        d = "08"
      }else if(d == "7"){
        d ="07"
      }else if (d == "6"){
        d = "06"
      }else if (d == "5"){
        d = "05"
      }else if (d == "4"){
        d = "04"
      }else if (d == "3"){
        d = "03"
      }else if (d == "2"){
        d = "02"
      }else if (d == "1"){
        d = "01"
      }

      console.log("day" + d);
      let mo = (((now.getMonth()+1) < 10 ? '0' : '') + (now.getMonth()+1)) ;

      let y = now.getFullYear();

      this.data.user_id = userId_value;
      this.data.feedDate = d + "/" + mo + "/" + y;
console.log(this.data.feedDate);
      loading.present();
      this.feed.todayAll(this.data).subscribe(allowed => {
          if (allowed.status == "ok") {
            loading.dismiss();
            this.feeds =allowed.alldayfeeds;
            this.total = 0;
            for(let i=0; i<this.feeds.length ;i++){
               if(!this.feeds[i].quantity){
                 this.feeds[i].quantity=0;
               }
              this.total += this.feeds[i].quantity;
            }

          } else {
            loading.dismiss();
            this.showError("error",'please retry an error occurred');
          }
        },
        error => {
          loading.dismiss();
          this.showError("error",'please retry an error occurred');
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
  goToUpdatePage(data) {

    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading Please Wait...'
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.push(FeedDetailPage,{
        data:data
      });
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);

  }
  deleteFeed(data){
    let loading = this.loadingCtrl.create({
      spinner: "circles",
      content: 'Please wait...'
    });

    loading.present();
    this.feed.deleteFeed(data).subscribe(allowed => {
        if (allowed.status == "ok") {
          loading.dismiss();
          this.showOk("feed deleted");
          this.getAllFeedRequest()
        } else {
          loading.dismiss();
          this.showError("error",'please retry an error occurred');
        }
      },
      error => {
        loading.dismiss();
        this.showError("error",'please retry an error occurred');
      });


  }
  showError(title,text) {


    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  update(){
    this.getAllFeedRequest();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad home');
    let loggedAs = this.readCookie('loggedAs');
   /* if(!loggedAs){
      this.presentLoginView();
      console.log('isn\'t logged');
    }else{
      console.log('is logged');
      this.getAllFeedRequest()
    }*/
  }
  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);
    this.getAllFeedRequest()
    setTimeout(() => {
      // console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  rightBreastTimer(){
this.rightBreastStarted=!this.rightBreastStarted;
this.chrono();
  }
  rightBreastTimerStop(){
    this.rightBreastStarted=!this.rightBreastStarted;
    clearTimeout(this.compte)
  }
  leftBreastTimer(){
    this.leftBreastStarted=!this.leftBreastStarted;
    this.chrono2();
  }
  leftBreastTimerStop(){
    this.leftBreastStarted=!this.leftBreastStarted;
    clearTimeout(this.compte2)
  }
  chrono(){
    this.centi++; //incrémentation des dixièmes de 1
    if (this.centi>9){this.centi=0;this.secon++} //si les dixièmes > 9, on les réinitialise à 0 et on incrémente les secondes de 1
    if (this.secon>59){this.secon=0;this.minu++} //si les secondes > 59,
    // this.compte=setTimeout('this.chrono()',100)
    this.compte=setTimeout(()=>{    //<<<---    using ()=> syntax
      this.chrono();
      this.time =((this.minu < 10 ? '0' : '') + this.minu)+":"+((this.secon < 10 ? '0' : '') + this.secon);
    },100);
  }
  chrono2(){
    this.centi2++; //incrémentation des dixièmes de 1
    if (this.centi2>9){this.centi2=0;this.secon2++} //si les dixièmes > 9, on les réinitialise à 0 et on incrémente les secondes de 1
    if (this.secon2>59){this.secon2=0;this.minu2++} //si les secondes > 59,
    // this.compte=setTimeout('this.chrono()',100)
    this.compte2=setTimeout(()=>{    //<<<---    using ()=> syntax
      this.chrono2();
      this.time2 =((this.minu2 < 10 ? '0' : '') + this.minu2)+":"+((this.secon2 < 10 ? '0' : '') + this.secon2);
    },100);
  }
  rasee(){ //fonction qui remet les compteurs à 0
    clearTimeout(this.compte) //arrête la fonction chrono()
    this.centi=0;
    this.secon=0;
    this.minu=0;
    this.centi2=0;
    this.secon2=0;
    this.minu2=0;
    this.time="00:00";
    this.time2="00:00";
  }

  saveBreast(){
    let loading = this.loadingCtrl.create({
      spinner: "circles",
      content: 'Please wait...'
    });

    /***
     * BREAST FEED
     */
    loading.present();
    this.dataBreast.userId =this.readCookie('user');
    let now = new Date();
    let h = now.getHours();
    let m = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();


    let d = now.getDate();
    let mo = (((now.getMonth()+1) < 10 ? '0' : '') + (now.getMonth()+1)) ;
    let y = now.getFullYear();

    this.dataBreast.feedDate = d + "/" + mo + "/" + y;
    this.dataBreast.feedHour = h + ":" + m;
    this.dataBreast.feedType = "breast-feeding";
    this.dataBreast.rightBreastData = this.time;
    this.dataBreast.leftBreastData = this.time2;
    this.dataBreast.quantity = 0;
    // console.log(this.dataBreast);

    this.feed.newfeed(this.dataBreast).subscribe(allowed => {
        console.log(allowed);
        if (allowed.status == "ok") {
          loading.dismiss();
          this.showOk("new feed added");
          this.getAllFeedRequest()

        } else {
          loading.dismiss();
          this.showError("error",'please retry an error occurred');
        }
      },
      error => {
        loading.dismiss();
        this.showError("error",'please retry an error occurred');
      });



  }

}
