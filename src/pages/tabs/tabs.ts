import { Component } from '@angular/core';
import {LoginServiceProvider} from "../../providers/login-service/login-service";
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ListPage} from "../list/list";
import { ModalController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {MessengerPage} from "../messenger/messenger";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ListPage;
  tab3Root = AboutPage;
  tab4Root = MessengerPage;
  tab5Root = ContactPage;

  constructor(public modalCtrl: ModalController,public log:LoginServiceProvider) {

  }
  presentLoginView(){
    let loginView = this.modalCtrl.create(LoginPage);
    loginView.present();
  }
  ngOnInit() {

   /* this.presentLoginView();*/
  }

  setUserRole(){
    //console.log('set User role');
    this.log.setRole().subscribe(res => {
        //console.log(res);
        if (res.status == "ok") {
          //console.log(res)
        } else {
          //console.log("ko")
        }
      },
      error => {
        //console.log(error)
      });
  }

}
