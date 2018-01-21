import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Loading,ModalController, ViewController } from 'ionic-angular';
import { UserServiceProvider} from "../../providers/user-service/user-service";
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {File} from "@ionic-native/file";
import {Platform} from "ionic-angular";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  userData: any[];
  avatarFile;
  isExistAvatar;
  avatar;
  avatarUrl;
  showingUpdateWeigh: boolean = false;
  addUserForm: FormGroup;
  loggedAs: string;
  isadmin: string;
  loggedIsAdmin: boolean;
  public base64Image: string;
  public image: string;

  constructor(private file:File,private camera: Camera, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, private userpr: UserServiceProvider, private alertCtrl: AlertController, public fb: FormBuilder, private platform: Platform) {

    platform.ready()
      .then(() => {
        return this.file.resolveDirectoryUrl(this.file.dataDirectory)
      })
      .then((rootDir) => {
        return this.file.getFile(rootDir, 'avatar.jpg', { create: false })
      })
      .then((fileEntry) => {
        fileEntry.file(file => {
          console.log(file);
          this.avatarFile = file.localURL.substring(3);
          console.log("#####construct avatar######");
          console.log(this.avatarFile);
        })

      });


    this.addUserForm = fb.group({

      'email': '',
      'userName': '',
      'role': '',
      'password': ''

    });

  }

  ngOnInit() {

    console.log('ion on init about');
    let user_value = this.readCookie('token');
    this.user(user_value);
    this.loggedAs = this.readCookie('loggedAs');
    this.isadmin = this.readCookie('isAdmin');
    if (this.isadmin === "true") {
      this.loggedIsAdmin = true;
    } else {
      this.loggedIsAdmin = false;
    }

  }

  readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  showUpdateWeigh() {
    this.showingUpdateWeigh = !this.showingUpdateWeigh;
  }

  public user(value: any) {
    /*this.showLoading();*/
    this.userpr.user(value).subscribe(allowed => {
        console.log(allowed);

        if (allowed.status == "ok") {
          this.userData = allowed.user;
          console.log("user data = ")
          console.log(this.userData)

          if (this.isadmin === "true") {
            this.loggedIsAdmin = true;
          } else {
            this.loggedIsAdmin = false;
          }
          /*
                    this.showOk("Login OK");
          */
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

  update(mail) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'update',
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  ionViewDidLoad() {
    console.log('ion on init about');
    let user_value = this.readCookie('token');
    console.log('token = ' + user_value);
    this.user(user_value);
  }

  ionViewWillEnter() {
    console.log("entered");
    this.isadmin = this.readCookie('isAdmin');
    if (this.isadmin === "true") {
      this.loggedIsAdmin = true;
    } else {
      this.loggedIsAdmin = false;
    }

  }

  addUser(data) {
    let userId_value = this.readCookie('user');
    console.log(userId_value);
    data._id = userId_value;
    this.userpr.appendUser(data).subscribe(allowed => {
        console.log(allowed);
        if (allowed.status == "ok") {
          this.showOk("user registered");
          // this.events.publish('loadData');
          // this.viewCtrl.dismiss(allowed);
        } else {
          this.showError("something wrong append");
        }
      },
      error => {
        this.showError(error);
      });


    /*let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle:'add '+data.userName+" "+data.email+" "+data.password,
      buttons: ['OK']
    });
    alert.present(prompt);*/
  }

  setAdmin(data: any) {

    // let userId_value = this.readCookie('user');
    // console.log(userId_value);
    // data._id = userId_value;

    console.log(data);
    this.userpr.setAdmin(data).subscribe(res => {
        console.log(res);
        if (res.status == "ok") {
          this.showOk("user is admin");
          let user_value = this.readCookie('token');
          console.log('token = ' + user_value);
          this.user(user_value);

          let date = new Date();
          date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
          let expires = "; expires=" + date.toUTCString();
          document.cookie = "isAdmin=" + true + ";expires=" + expires + ";";

        } else {
          this.showError("something wrong append");
        }
      },
      error => {
        this.showError(error);
      });

  }

  setUser(data: any) {

    // let userId_value = this.readCookie('user');
    // console.log(userId_value);
    // data._id = userId_value;

    console.log(data);
    this.userpr.setUser(data).subscribe(res => {
        console.log(res);
        if (res.status == "ok") {
          this.showOk("user is admin");
          let user_value = this.readCookie('token');
          console.log('token = ' + user_value);
          let date = new Date();
          date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
          let expires = "; expires=" + date.toUTCString();
          document.cookie = "isAdmin=" + true + ";expires=" + expires + ";";
          this.user(user_value);

        } else {
          this.showError("something wrong append");
        }
      },
      error => {
        this.showError(error);
      });

  }

  changeAvatar() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Replace Avatar',
      subTitle:"take a picture or choose from album",
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            console.log('Camera clicked');
            this.takePics();
          }
        }, {
          text: 'Album',
          handler: () => {
            console.log('Album clicked');
            this.choosePics();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]

    });
    actionSheet.present();

  }

takePics(){
 let options: CameraOptions = {
    quality: 100,
/*
    destinationType: this.camera.DestinationType.DATA_URL,
*/
   destinationType: this.camera.DestinationType.NATIVE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    allowEdit:false

  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    console.log("################# data ####################");
    //this.base64Image = 'data:image/jpeg;base64,' + imageData;


    /*let currentName = imageData.replace(/^.*[\\\/]/, '');
    let n = "avatar";
    let newFileName = n + ".jpg";*/
    console.log('##############');
    console.log('imageData :');
    console.log(imageData);
    this.avatarUrl =  imageData.replace("assets-library://", "cdvfile://localhost/assets-library/");






    this.userpr.userAvatar(imageData).subscribe(res =>{
  console.log(res);
});

/*this.file.moveFile(this.file.tempDirectory,currentName,this.file.dataDirectory,newFileName).then(function(success){

  //success.nativeURL will contain the path to the photo in permanent storage, do whatever you wish with it, e.g:
  console.log('############## success ##############');
  console.log('success.nativeURL :');
  console.log(success.nativeURL);

  console.log('##############');

}, function(error){
  //an error occured
  console.log('############## error ###############');
  console.log(error.message);

});*/






  }, (err) => {
    // Handle error
  });

}

choosePics(){
  let options: CameraOptions = {
    quality: 100,
/*
    destinationType: this.camera.DestinationType.DATA_URL,
*/
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit:false

  };
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    console.log(imageData);
    console.log("#####################################");
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    console.log(this.base64Image);



  }, (err) => {
    // Handle error
  });
}


}
