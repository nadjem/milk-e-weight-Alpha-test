import { Component } from '@angular/core';
import { IonicPage, NavParams,AlertController, Loading,ModalController, ViewController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Events } from 'ionic-angular'
import { NavController,LoadingController } from 'ionic-angular';
import {RegisterPage} from "../register/register";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  loginForm : FormGroup;
  constructor(public events:Events,public navCtrl: NavController,public navParams: NavParams, private log: LoginServiceProvider, private alertCtrl: AlertController, public modalCtrl: ModalController,public viewCtrl: ViewController,public fb: FormBuilder) {

this.loginForm = fb.group({

  'email': '',
  'password':'',
  'rememberMe':''


});

  }

  public login(value: any) {
    /*this.showLoading();*/
    this.log.login(value).subscribe(allowed => {
      console.log(allowed);
        if (allowed.status == "ok") {
          this.showOk("Login OK");
          this.events.publish('loadData');
          this.viewCtrl.dismiss(allowed);
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }

/*
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
*/

  showError(text) {


    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showOk(text) {


    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  createAccount(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
