import { Component, OnInit, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  {FeedProvider } from "../../providers/feed/feed";
import {AlertController,LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular'
import {Observable} from 'rxjs/Rx';

/**
 * Generated class for the AllDataDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-data-detail',
  templateUrl: 'all-data-detail.html',
})
export class AllDataDetailPage {
  data:any={};
  dataDate:any;
  dataSum:any;
  feeds:any;
  breastFeeds:any;
  visibleChart:boolean=false;
  chartDataSum:any=[];
  chartDataDate:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,private feed:FeedProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllDataDetailPage');
    this.dataDate =  this.navParams.get('data');

    this.dataSum =  this.navParams.get('sum');
    let userId_value = this.readCookie('user');
    this.getAllFeedRequest(this.dataDate,userId_value);
    this.getAllBreastFeedRequest(this.dataDate,userId_value);
  }
  getAllFeedRequest(date,user_id){
    let loading = this.loadingCtrl.create({
      spinner: "circles",
      content: 'Please wait...'
    });

    this.data.user_id = user_id;
     this.data.feedDate = date;
    console.log(this.data);
     loading.present();
    this.feed.todayAllBottle(this.data).subscribe(allowed => {
        console.log(allowed);
        if (allowed.status == "ok") {
          loading.dismiss();
          this.feeds =allowed.alldayfeeds;
          this.createDataFrom(this.feeds);


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

  getAllBreastFeedRequest(date,user_id){
    let loading = this.loadingCtrl.create({
      spinner: "circles",
      content: 'Please wait...'
    });

    this.data.user_id = user_id;
    this.data.feedDate = date;
    console.log(this.data);
    loading.present();
    this.feed.todayAllBreast(this.data).subscribe(allowed => {
      console.log("breast")
        console.log(allowed);
        if (allowed.status == "ok") {
          loading.dismiss();
          this.breastFeeds =allowed.alldayfeeds;


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

  showError(title,text) {


    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  /**
   *
   * CHART
   */

  createDataFrom(feeds){
    console.log('create data from = ');


console.log(feeds);
     for(let i =0; i<feeds.length; i++){
       console.log(feeds[i].quantity);
       console.log(feeds[i].savedAtHours);
     let dataSum  = feeds[i].quantity;
      let dataDate  = feeds[i].savedAtHours;
    //
      this.chartDataSum.push(dataSum);
      this.chartDataDate.push(dataDate);
     }

    console.log(this.chartDataDate);
    console.log(this.chartDataSum);

  }
  public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels:string[] = this.chartDataDate;
  public barChartType:string = 'line';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: this.chartDataSum, label: "feeds"},

  ];



  public randomize():void {
    // Only Change 3 values

    this.barChartData = this.chartDataSum;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */

  }

  showChart(){
    this.visibleChart = !this.visibleChart;
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
          let userId_value = this.readCookie('user');
          this.getAllFeedRequest(this.dataDate,userId_value);
          this.getAllBreastFeedRequest(this.dataDate,userId_value);
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
  showOk(text) {

    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
