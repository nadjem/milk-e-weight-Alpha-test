import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { UserServiceProvider} from "../providers/user-service/user-service";
import {ListPage} from "../pages/list/list";
import { FeedProvider } from '../providers/feed/feed';
import { NgPipesModule } from 'angular-pipes';
import { FeedDetailPage} from "../pages/feed-detail/feed-detail";
import {RegisterPage} from "../pages/register/register";
import { ChartsModule } from 'ng2-charts';
import {AllDataDetailPage} from "../pages/all-data-detail/all-data-detail";
import {MessengerPage} from "../pages/messenger/messenger";
import { Camera } from '@ionic-native/camera';
import{ File} from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ListPage,
    FeedDetailPage,
    AllDataDetailPage,
    MessengerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    NgPipesModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ListPage,
    RegisterPage,
    FeedDetailPage,
    AllDataDetailPage,
    MessengerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    UserServiceProvider,
    FeedProvider,
    Camera,
    File
  ]
})
export class AppModule {}
