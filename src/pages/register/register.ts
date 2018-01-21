import { Component } from '@angular/core';
import { IonicPage, NavParams,AlertController, Loading,ModalController, ViewController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Events } from 'ionic-angular'
import { NavController,LoadingController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Http} from "@angular/http";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
registerForm:FormGroup;
  constructor(public events:Events,public navCtrl: NavController,public navParams: NavParams, private log: LoginServiceProvider, private alertCtrl: AlertController, public modalCtrl: ModalController,public viewCtrl: ViewController,public fb: FormBuilder,private registerService: LoginServiceProvider) {

    this.registerForm = fb.group({

      'email': '',
      'userName':'',
      'password':'',
      'passwordConf':'',
      'role':'',
      'babyName':'',
      'dateOfBirth':'',
      'acceptCGU':''

    });

  }

register(data){
    console.log(data);
    this.registerService.register(data).subscribe(allowed => {
        console.log(allowed);
        if (allowed.status == "ok") {
          this.showOk("register OK");
          this.viewCtrl.dismiss(allowed);
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
}


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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
