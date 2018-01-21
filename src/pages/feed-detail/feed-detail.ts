import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import  {FeedProvider } from "../../providers/feed/feed";
import { Events } from 'ionic-angular'
/**
 * Generated class for the FeedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed-detail',
  templateUrl: 'feed-detail.html',
})
export class FeedDetailPage {
 data:any;
  updateFeedForm: FormGroup;
  constructor(public events:Events,public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder,private feed:FeedProvider,public loadingCtrl: LoadingController, private alertCtrl: AlertController) {

    this.updateFeedForm = fb.group({

      'feedHour': '',
      'quantity':''

    });

  }
updateFeed(data){

data._id =this.data._id;

if(data.feedHour.lenght < 0 || !data.feedHour || data.feedHour === "" ){
  data.feedHour = this.data.savedAtHours;
}
    data.user_id = this.readCookie('user');
  let loading = this.loadingCtrl.create({
    spinner: "circles",
    content: 'Please wait...'
  });

  // loading.present();

this.feed.updateFeed(data).subscribe(allowed => {

    if (allowed.status == "ok") {
      loading.dismiss();
      this.showOk("feed updated");
      this.events.publish('reloadDetails');
      this.navCtrl.pop();

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
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedDetailPage');
  this.data =  this.navParams.get('data');
  console.log(this.data);
  }
  showOk(text) {


    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showError(title,text) {


    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
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
