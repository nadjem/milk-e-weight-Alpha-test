import { Component, OnInit, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,Events,ModalController  } from 'ionic-angular';
import  {FeedProvider } from "../../providers/feed/feed";
import {Observable} from 'rxjs/Rx';
import {AllDataDetailPage} from "../all-data-detail/all-data-detail";

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  data:any={};
  feeds:any;
  showDataBool:boolean=false;
  chartDataSum:any=[];
  chartDataDate:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private feed:FeedProvider,private alertCtrl: AlertController,public loadingCtrl: LoadingController,public events:Events) {
  }

  ionViewDidLoad() {
   
  }
  ionViewWillEnter(){
    this.getAll()
  }
  getAll(){
    let userId_value = this.readCookie('user');
    console.log(userId_value);
    this.data.user_id=userId_value;
    let loading = this.loadingCtrl.create({
      spinner: "circles",
      content: 'Please wait...'
    });

    loading.present();
    this.feed.AllFeed(this.data).subscribe(allowed => {
        console.log(allowed);
        if (allowed.status == "ok") {
          loading.dismiss();


          this.feeds =allowed.feed;
          for (let i=0; i< this.feeds.length; i++){
            let month=(parseInt(this.feeds[i]._id.split("/")[1]))-1;

            switch(month) {
              case 0:
                this.feeds[i].month = "January";
                break;
              case 1:
                this.feeds[i].month = "February";
                break;
              case 2:
                this.feeds[i].month = "March";
                break;
              case 3:
                this.feeds[i].month = "April";
                break;
              case 4:
                this.feeds[i].month = "May";
                break;
              case 5:
                this.feeds[i].month = "Jun";
                break;
              case 6:
                this.feeds[i].month = "July";
                break;
              case 7:
                this.feeds[i].month = "August";
                break;
              case 8:
                this.feeds[i].month = "September";
                break;
              case 9:
                this.feeds[i].month = "October";
                break;
              case 10:
                this.feeds[i].month = "November";
                break;
              case 11:
                this.feeds[i].month = "December";
                break;
              default:
                this.feeds[i].month = "Error No Month information";
                break;
            }

          }
          console.log(this.feeds);
          this.barChartData = this.chartDataSum;
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

  createDataFrom(feeds){
console.log('create data from = ');



    for(let i =0; i<feeds.length; i++){

      let dataSum  = feeds[i].sumQ;
      let dataDate  = feeds[i]._id;

      this.chartDataSum.push(dataSum);
      this.chartDataDate.push(dataDate);
    }

    console.log(this.chartDataDate);
    console.log(this.chartDataSum);
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
  doRefresh(refresher) {
    this.chartDataDate=[];
    this.chartDataSum=[];
    console.log('Begin async operation', refresher);
    this.getAll()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
  showDataBtn(){
    this.showDataBool =!this.showDataBool;
  }

  /**
   *
   * CHART
   */
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = this.chartDataDate;
  public barChartType:string = 'line';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: this.chartDataSum, label: 'daily'},

  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

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

  public detailPage(data,data2){
    console.log(data);

    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading Please Wait...'
    });

    loading.present();

    setTimeout(() => {
    this.navCtrl.push(AllDataDetailPage,{
        data:data,
        sum:data2
      });
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }


}
