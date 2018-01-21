webpackJsonp([6],{

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllDataDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_feed_feed__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AllDataDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AllDataDetailPage = (function () {
    function AllDataDetailPage(navCtrl, navParams, loadingCtrl, feed, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.feed = feed;
        this.alertCtrl = alertCtrl;
        this.data = {};
        this.visibleChart = false;
        this.chartDataSum = [];
        this.chartDataDate = [];
        this.barChartOptions = {
            scaleShowVerticalLines: true,
            responsive: true
        };
        this.barChartLabels = this.chartDataDate;
        this.barChartType = 'line';
        this.barChartLegend = true;
        this.barChartData = [
            { data: this.chartDataSum, label: "feeds" },
        ];
    }
    AllDataDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AllDataDetailPage');
        this.dataDate = this.navParams.get('data');
        this.dataSum = this.navParams.get('sum');
        var userId_value = this.readCookie('user');
        this.getAllFeedRequest(this.dataDate, userId_value);
        this.getAllBreastFeedRequest(this.dataDate, userId_value);
    };
    AllDataDetailPage.prototype.getAllFeedRequest = function (date, user_id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        this.data.user_id = user_id;
        this.data.feedDate = date;
        console.log(this.data);
        loading.present();
        this.feed.todayAllBottle(this.data).subscribe(function (allowed) {
            console.log(allowed);
            if (allowed.status == "ok") {
                loading.dismiss();
                _this.feeds = allowed.alldayfeeds;
                _this.createDataFrom(_this.feeds);
            }
            else {
                loading.dismiss();
                _this.showError("error", 'please retry an error occurred');
            }
        }, function (error) {
            loading.dismiss();
            _this.showError("error", 'please retry an error occurred');
        });
    };
    AllDataDetailPage.prototype.getAllBreastFeedRequest = function (date, user_id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        this.data.user_id = user_id;
        this.data.feedDate = date;
        console.log(this.data);
        loading.present();
        this.feed.todayAllBreast(this.data).subscribe(function (allowed) {
            console.log("breast");
            console.log(allowed);
            if (allowed.status == "ok") {
                loading.dismiss();
                _this.breastFeeds = allowed.alldayfeeds;
            }
            else {
                loading.dismiss();
                _this.showError("error", 'please retry an error occurred');
            }
        }, function (error) {
            loading.dismiss();
            _this.showError("error", 'please retry an error occurred');
        });
    };
    AllDataDetailPage.prototype.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    AllDataDetailPage.prototype.showError = function (title, text) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    /**
     *
     * CHART
     */
    AllDataDetailPage.prototype.createDataFrom = function (feeds) {
        console.log('create data from = ');
        console.log(feeds);
        for (var i = 0; i < feeds.length; i++) {
            console.log(feeds[i].quantity);
            console.log(feeds[i].savedAtHours);
            var dataSum = feeds[i].quantity;
            var dataDate = feeds[i].savedAtHours;
            //
            this.chartDataSum.push(dataSum);
            this.chartDataDate.push(dataDate);
        }
        console.log(this.chartDataDate);
        console.log(this.chartDataSum);
    };
    AllDataDetailPage.prototype.randomize = function () {
        // Only Change 3 values
        this.barChartData = this.chartDataSum;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    };
    AllDataDetailPage.prototype.showChart = function () {
        this.visibleChart = !this.visibleChart;
    };
    AllDataDetailPage.prototype.deleteFeed = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        loading.present();
        this.feed.deleteFeed(data).subscribe(function (allowed) {
            if (allowed.status == "ok") {
                loading.dismiss();
                _this.showOk("feed deleted");
                var userId_value = _this.readCookie('user');
                _this.getAllFeedRequest(_this.dataDate, userId_value);
                _this.getAllBreastFeedRequest(_this.dataDate, userId_value);
            }
            else {
                loading.dismiss();
                _this.showError("error", 'please retry an error occurred');
            }
        }, function (error) {
            loading.dismiss();
            _this.showError("error", 'please retry an error occurred');
        });
    };
    AllDataDetailPage.prototype.showOk = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    AllDataDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-all-data-detail',template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/all-data-detail/all-data-detail.html"*/'<!--\n  Generated template for the AllDataDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>stored feeds </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n\n    <ion-item-divider color="light"><p ion-text>bottle-feeding</p><strong>{{dataDate}}</strong>\n      <ion-badge *ngIf="dataSum >= 1000" item-end >{{dataSum / 10}} cl </ion-badge>\n      <ion-badge *ngIf="dataSum < 1000" item-end >{{dataSum}} ml</ion-badge>\n    </ion-item-divider>\n\n    <ion-item-sliding *ngFor="let feed of feeds | orderBy: \'savedAtHours\'">\n      <ion-item>\n\n        <p>{{feed?.savedAtHours}}</p> <p ion-text>{{feed?.feedType}}</p>\n        <ion-badge *ngIf="feed?.feedType != \'breast-feeding\' " item-end>{{feed?.quantity}} ml</ion-badge>\n        <ion-badge color="light" *ngIf="feed?.feedType == \'breast-feeding\' " item-end>right: {{feed?.rightBreastData}}min</ion-badge>\n        <ion-badge color="light" *ngIf="feed?.feedType == \'breast-feeding\' " item-end>left: {{feed?.leftBreastData }}min</ion-badge>\n      </ion-item>\n      <ion-item-options side="righ">\n        <button ion-button color="primary" (click)="goToUpdatePage(feed)">\n          <ion-icon small name="ios-create-outline"></ion-icon>\n          update\n        </button>\n        <button ion-button color="danger" (click)="deleteFeed(feed._id)">\n          <ion-icon small name="ios-close-circle-outline"></ion-icon>\n          delete\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n<ion-item>\n  <button ion-button (click)="showChart()">\n    show diagram\n  </button>\n</ion-item>\n  </ion-list>\n  <ion-item class="chartDiv" *ngIf="visibleChart">\n    <div>\n      <div style="display: block">\n        <canvas baseChart\n                [datasets]="barChartData"\n                [labels]="barChartLabels"\n                [options]="barChartOptions"\n                [legend]="barChartLegend"\n                [chartType]="barChartType"\n                ></canvas>\n      </div>\n\n    </div>\n  </ion-item>\n  <ion-list *ngIf="breastFeeds?.length > 0">\n    <ion-item-divider color="light"><p ion-text>breast-feeding</p><strong>{{dataDate}}</strong>\n    </ion-item-divider>\n    <ion-item-sliding *ngFor="let feed of breastFeeds | orderBy: \'savedAtHours\'">\n      <ion-item>\n\n        <p>{{feed?.savedAtHours}}</p> <p ion-text>{{feed?.feedType}}</p>\n        <ion-badge color="light" *ngIf="feed?.feedType == \'breast-feeding\' " item-end>right: {{feed?.rightBreastData}}min</ion-badge>\n        <ion-badge color="light" *ngIf="feed?.feedType == \'breast-feeding\' " item-end>left: {{feed?.leftBreastData }}min</ion-badge>\n      </ion-item>\n      <ion-item-options side="righ">\n        <button ion-button color="primary" (click)="goToUpdatePage(feed)">\n          <ion-icon small name="ios-create-outline"></ion-icon>\n          update\n        </button>\n        <button ion-button color="danger" (click)="deleteFeed(feed._id)">\n          <ion-icon small name="ios-close-circle-outline"></ion-icon>\n          delete\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/all-data-detail/all-data-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_feed_feed__["a" /* FeedProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], AllDataDetailPage);
    return AllDataDetailPage;
}());

//# sourceMappingURL=all-data-detail.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_feed_feed__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the FeedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FeedDetailPage = (function () {
    function FeedDetailPage(events, navCtrl, navParams, fb, feed, loadingCtrl, alertCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.feed = feed;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.updateFeedForm = fb.group({
            'feedHour': '',
            'quantity': ''
        });
    }
    FeedDetailPage.prototype.updateFeed = function (data) {
        var _this = this;
        data._id = this.data._id;
        if (data.feedHour.lenght < 0 || !data.feedHour || data.feedHour === "") {
            data.feedHour = this.data.savedAtHours;
        }
        data.user_id = this.readCookie('user');
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        // loading.present();
        this.feed.updateFeed(data).subscribe(function (allowed) {
            if (allowed.status == "ok") {
                loading.dismiss();
                _this.showOk("feed updated");
                _this.events.publish('reloadDetails');
                _this.navCtrl.pop();
            }
            else {
                loading.dismiss();
                _this.showError("error", 'please retry an error occurred');
            }
        }, function (error) {
            loading.dismiss();
            _this.showError("error", 'please retry an error occurred');
        });
    };
    FeedDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedDetailPage');
        this.data = this.navParams.get('data');
        console.log(this.data);
    };
    FeedDetailPage.prototype.showOk = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    FeedDetailPage.prototype.showError = function (title, text) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    FeedDetailPage.prototype.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    FeedDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-feed-detail',template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/feed-detail/feed-detail.html"*/'<!--\n  Generated template for the FeedDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Update Feed</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form (ngSubmit)="updateFeed(updateFeedForm.value)" [formGroup]="updateFeedForm">\n\n  <ion-list>\n    <ion-item-divider color="light"><strong>feed hour</strong></ion-item-divider>\n    <ion-item>\n      <ion-label>current value:</ion-label>\n      <ion-badge item-end *ngIf="!updateFeedForm.value.feedHour"> {{data?.savedAtHours}} </ion-badge>\n      <ion-badge item-end *ngIf="updateFeedForm.value.feedHour">{{updateFeedForm.value.feedHour}}</ion-badge>\n      <ion-datetime  displayFormat="" pickerFormat="HH mm " [formControl]="updateFeedForm.controls.feedHour"  name="feedHour"></ion-datetime>\n    </ion-item>\n\n    <ion-item-divider color="light"><strong>feeding bottle weigh</strong></ion-item-divider>\n    <ion-item>\n      <ion-label fixed>quantity :</ion-label>\n\n      <ion-input type="number" value="{{data?.quantity}}" [formControl]="updateFeedForm.controls.quantity" name="quantity"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <button item-right="" type="submit" ion-button icon-left>\n        <ion-icon  name="md-archive"></ion-icon>\n        save\n      </button>\n    </ion-item>\n\n  </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/feed-detail/feed-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__providers_feed_feed__["a" /* FeedProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], FeedDetailPage);
    return FeedDetailPage;
}());

//# sourceMappingURL=feed-detail.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_feed_feed__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__all_data_detail_all_data_detail__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListPage = (function () {
    function ListPage(navCtrl, navParams, feed, alertCtrl, loadingCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.feed = feed;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.data = {};
        this.showDataBool = false;
        this.chartDataSum = [];
        this.chartDataDate = [];
        /**
         *
         * CHART
         */
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = this.chartDataDate;
        this.barChartType = 'line';
        this.barChartLegend = true;
        this.barChartData = [
            { data: this.chartDataSum, label: 'daily' },
        ];
    }
    ListPage.prototype.ionViewDidLoad = function () {
    };
    ListPage.prototype.ionViewWillEnter = function () {
        this.getAll();
    };
    ListPage.prototype.getAll = function () {
        var _this = this;
        var userId_value = this.readCookie('user');
        console.log(userId_value);
        this.data.user_id = userId_value;
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        loading.present();
        this.feed.AllFeed(this.data).subscribe(function (allowed) {
            console.log(allowed);
            if (allowed.status == "ok") {
                loading.dismiss();
                _this.feeds = allowed.feed;
                for (var i = 0; i < _this.feeds.length; i++) {
                    var month = (parseInt(_this.feeds[i]._id.split("/")[1])) - 1;
                    switch (month) {
                        case 0:
                            _this.feeds[i].month = "January";
                            break;
                        case 1:
                            _this.feeds[i].month = "February";
                            break;
                        case 2:
                            _this.feeds[i].month = "March";
                            break;
                        case 3:
                            _this.feeds[i].month = "April";
                            break;
                        case 4:
                            _this.feeds[i].month = "May";
                            break;
                        case 5:
                            _this.feeds[i].month = "Jun";
                            break;
                        case 6:
                            _this.feeds[i].month = "July";
                            break;
                        case 7:
                            _this.feeds[i].month = "August";
                            break;
                        case 8:
                            _this.feeds[i].month = "September";
                            break;
                        case 9:
                            _this.feeds[i].month = "October";
                            break;
                        case 10:
                            _this.feeds[i].month = "November";
                            break;
                        case 11:
                            _this.feeds[i].month = "December";
                            break;
                        default:
                            _this.feeds[i].month = "Error No Month information";
                            break;
                    }
                }
                console.log(_this.feeds);
                _this.barChartData = _this.chartDataSum;
                _this.createDataFrom(_this.feeds);
            }
            else {
                loading.dismiss();
                _this.showError("error", 'please retry an error occurred');
            }
        }, function (error) {
            loading.dismiss();
            _this.showError("error", 'please retry an error occurred');
        });
    };
    ListPage.prototype.createDataFrom = function (feeds) {
        console.log('create data from = ');
        for (var i = 0; i < feeds.length; i++) {
            var dataSum = feeds[i].sumQ;
            var dataDate = feeds[i]._id;
            this.chartDataSum.push(dataSum);
            this.chartDataDate.push(dataDate);
        }
        console.log(this.chartDataDate);
        console.log(this.chartDataSum);
    };
    ListPage.prototype.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    ListPage.prototype.showError = function (title, text) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    ListPage.prototype.doRefresh = function (refresher) {
        this.chartDataDate = [];
        this.chartDataSum = [];
        console.log('Begin async operation', refresher);
        this.getAll();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 1000);
    };
    ListPage.prototype.showDataBtn = function () {
        this.showDataBool = !this.showDataBool;
    };
    // events
    ListPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ListPage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ListPage.prototype.randomize = function () {
        // Only Change 3 values
        this.barChartData = this.chartDataSum;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    };
    ListPage.prototype.detailPage = function (data, data2) {
        var _this = this;
        console.log(data);
        var loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Loading Please Wait...'
        });
        loading.present();
        setTimeout(function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__all_data_detail_all_data_detail__["a" /* AllDataDetailPage */], {
                data: data,
                sum: data2
            });
        }, 1000);
        setTimeout(function () {
            loading.dismiss();
        }, 1000);
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/list/list.html"*/'<!--\n  Generated template for the ListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n\n\n\n\n</ion-header>\n\n\n<ion-content >\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n    </ion-refresher-content>\n  </ion-refresher>\n  <ion-item-divider color="dark">All Data Feeds\n  </ion-item-divider>\n\n\n    <div class="listAllData" >\n      <!--{{feed | json}}-->\n       <ion-list *ngFor="let feed of feeds | orderBy: \'_id\' | groupBy: \'month\'">\n         <ion-item-divider color="light">{{feed.key}} </ion-item-divider>\n         <button  *ngFor="let row of feed.value" ion-item (click)="detailPage(row._id , row.sumQ)">\n            {{row._id}} <ion-badge item-end>{{row.sumQ}} ml</ion-badge>\n           </button>\n\n       </ion-list>\n    </div>\n  <ion-item>\n    <div>\n      <div style="display: block">\n        <canvas baseChart\n                [datasets]="barChartData"\n                [labels]="barChartLabels"\n                [options]="barChartOptions"\n                [legend]="barChartLegend"\n                [chartType]="barChartType"\n                (chartHover)="chartHovered($event)"\n                (chartClick)="chartClicked($event)"></canvas>\n      </div>\n      <button (click)="randomize()">Update</button>\n    </div>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/list/list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_feed_feed__["a" /* FeedProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_login_service_login_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(events, navCtrl, navParams, log, alertCtrl, modalCtrl, viewCtrl, fb, registerService) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.log = log;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.fb = fb;
        this.registerService = registerService;
        this.registerForm = fb.group({
            'email': '',
            'userName': '',
            'password': '',
            'passwordConf': '',
            'role': '',
            'babyName': '',
            'dateOfBirth': '',
            'acceptCGU': ''
        });
    }
    RegisterPage.prototype.register = function (data) {
        var _this = this;
        console.log(data);
        this.registerService.register(data).subscribe(function (allowed) {
            console.log(allowed);
            if (allowed.status == "ok") {
                _this.showOk("register OK");
                _this.viewCtrl.dismiss(allowed);
            }
            else {
                _this.showError("Access Denied");
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    RegisterPage.prototype.showError = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    RegisterPage.prototype.showOk = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title width-67><img src="assets/imgs/milkNav.png" style="width: 60px"/></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="register-content" padding>\n  <h4 text-center>create account</h4>\n  <hr>\n\n  <div class="register-box">\n    <form (ngSubmit)="register(registerForm.value)" [formGroup]="registerForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n\n            <ion-item>\n              <ion-input type="email" placeholder="Email" name="email"  [formControl]="registerForm.controls.email"  required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="text" placeholder="User Name" name="userName"  [formControl]="registerForm.controls.userName"  required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [formControl]="registerForm.controls.password" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="retype Password" name="passwordConf" [formControl]="registerForm.controls.passwordConf" required></ion-input>\n            </ion-item>\n\n\n\n            <ion-item>\n              <ion-label>Role</ion-label>\n              <ion-select [formControl]="registerForm.controls.role" name="role">\n                <ion-option value="Father">Father</ion-option>\n                <ion-option value="Mother">Mother</ion-option>\n                <ion-option value="Grandfather">Grandfather</ion-option>\n                <ion-option value="Grandmother">Grandmother</ion-option>\n                <ion-option value="Nurse">Nurse</ion-option>\n              </ion-select>\n            </ion-item>\n\n\n\n\n            <ion-item>\n              <ion-input type="text" placeholder="Baby Name" name="babyName"  [formControl]="registerForm.controls.babyName"  required></ion-input>\n            </ion-item>\n\n\n\n\n            <ion-item>\n              <ion-label>Birth Date</ion-label>\n              <ion-badge item-end>add</ion-badge>\n              <ion-datetime  displayFormat="DD/MM/YYYY" pickerFormat="DD MM YYYY" [formControl]="registerForm.controls.dateOfBirth" name="dateOfBirth"></ion-datetime>\n            </ion-item>\n\n\n\n            <ion-item>\n              <div class="checkbox float-left">\n                <label>\n                  <input [formControl]="registerForm.controls.acceptCGU" type="checkbox" value="acceptCGU" name="acceptCGU"> accept CGU\n                </label>\n              </div>\n            </ion-item>\n\n\n          </ion-list>\n\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.valid">Register</button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_login_service_login_service__["a" /* LoginServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__providers_login_service_login_service__["a" /* LoginServiceProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessengerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the MessengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MessengerPage = (function () {
    function MessengerPage(navCtrl, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
    }
    MessengerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessengerPage');
    };
    MessengerPage.prototype.doRefresh = function (refresher) {
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        loading.present();
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
            loading.dismiss();
        }, 1000);
    };
    MessengerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-messenger',template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/messenger/messenger.html"*/'<!--\n  Generated template for the MessengerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Message</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n    </ion-refresher-content>\n  </ion-refresher>\n  <ion-item-divider color="light"><strong>Message list</strong>\n\n\n\n  </ion-item-divider>\n\n  <ion-card>\n    <ion-card-header>\n      <sub class="subName" ion-text color="light">nurse</sub><ion-badge  item-right color="primary">new</ion-badge>\n    </ion-card-header>\n    <ion-list>\n      <button ion-item>\n        <p>its ok Malik have take her...</p>\n      </button>\n    </ion-list>\n  </ion-card>\n\n  <ion-card>\n    <ion-card-header>\n      <sub class="subName" ion-text color="light">mom</sub>\n    </ion-card-header>\n    <ion-list>\n      <button ion-item>\n        <p>Today Malik need...</p>\n      </button>\n    </ion-list>\n  </ion-card>\n\n  <ion-card>\n    <ion-card-header>\n      <sub class="subName" ion-text color="light">dad</sub>\n    </ion-card-header>\n    <ion-list>\n      <button ion-item>\n        <p>Malik can...</p>\n      </button>\n    </ion-list>\n  </ion-card>\n\n  <ion-item-divider color="light"><strong>Write Message</strong> <button ion-button>\n   new\n  </button>\n  </ion-item-divider>\n\n</ion-content>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/messenger/messenger.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], MessengerPage);
    return MessengerPage;
}());

//# sourceMappingURL=messenger.js.map

/***/ }),

/***/ 180:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 180;

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/all-data-detail/all-data-detail.module": [
		942,
		5
	],
	"../pages/feed-detail/feed-detail.module": [
		943,
		4
	],
	"../pages/list/list.module": [
		944,
		3
	],
	"../pages/login/login.module": [
		945,
		2
	],
	"../pages/messenger/messenger.module": [
		947,
		1
	],
	"../pages/register/register.module": [
		946,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 224;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_login_service_login_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_about__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contact_contact__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__list_list__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__messenger_messenger__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TabsPage = (function () {
    function TabsPage(modalCtrl, log) {
        this.modalCtrl = modalCtrl;
        this.log = log;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_5__list_list__["a" /* ListPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__about_about__["a" /* AboutPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_8__messenger_messenger__["a" /* MessengerPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_3__contact_contact__["a" /* ContactPage */];
    }
    TabsPage.prototype.presentLoginView = function () {
        var loginView = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
        loginView.present();
    };
    TabsPage.prototype.ngOnInit = function () {
        /* this.presentLoginView();*/
    };
    TabsPage.prototype.setUserRole = function () {
        //console.log('set User role');
        this.log.setRole().subscribe(function (res) {
            //console.log(res);
            if (res.status == "ok") {
                //console.log(res)
            }
            else {
                //console.log("ko")
            }
        }, function (error) {
            //console.log(error)
        });
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="ai-home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="List of feed" tabIcon="ai-stats-bars"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Account" tabIcon="ai-child_care" (ionSelect)="setUserRole()"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Messages" tabIcon="ios-mail-outline"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1__providers_login_service_login_service__["a" /* LoginServiceProvider */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AboutPage = (function () {
    function AboutPage(file, camera, actionSheetCtrl, navCtrl, userpr, alertCtrl, fb, platform) {
        var _this = this;
        this.file = file;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.userpr = userpr;
        this.alertCtrl = alertCtrl;
        this.fb = fb;
        this.platform = platform;
        this.showingUpdateWeigh = false;
        platform.ready()
            .then(function () {
            return _this.file.resolveDirectoryUrl(_this.file.dataDirectory);
        })
            .then(function (rootDir) {
            return _this.file.getFile(rootDir, 'avatar.jpg', { create: false });
        })
            .then(function (fileEntry) {
            fileEntry.file(function (file) {
                console.log(file);
                _this.avatarFile = file.localURL.substring(3);
                console.log("#####construct avatar######");
                console.log(_this.avatarFile);
            });
        });
        this.addUserForm = fb.group({
            'email': '',
            'userName': '',
            'role': '',
            'password': ''
        });
    }
    AboutPage.prototype.ngOnInit = function () {
        console.log('ion on init about');
        var user_value = this.readCookie('token');
        this.user(user_value);
        this.loggedAs = this.readCookie('loggedAs');
        this.isadmin = this.readCookie('isAdmin');
        if (this.isadmin === "true") {
            this.loggedIsAdmin = true;
        }
        else {
            this.loggedIsAdmin = false;
        }
    };
    AboutPage.prototype.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    AboutPage.prototype.showUpdateWeigh = function () {
        this.showingUpdateWeigh = !this.showingUpdateWeigh;
    };
    AboutPage.prototype.user = function (value) {
        var _this = this;
        /*this.showLoading();*/
        this.userpr.user(value).subscribe(function (allowed) {
            console.log(allowed);
            if (allowed.status == "ok") {
                _this.userData = allowed.user;
                console.log("user data = ");
                console.log(_this.userData);
                if (_this.isadmin === "true") {
                    _this.loggedIsAdmin = true;
                }
                else {
                    _this.loggedIsAdmin = false;
                }
                /*
                          this.showOk("Login OK");
                */
            }
            else {
                _this.showError("Access Denied");
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    AboutPage.prototype.showError = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    AboutPage.prototype.showOk = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    AboutPage.prototype.update = function (mail) {
        var alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'update',
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ion on init about');
        var user_value = this.readCookie('token');
        console.log('token = ' + user_value);
        this.user(user_value);
    };
    AboutPage.prototype.ionViewWillEnter = function () {
        console.log("entered");
        this.isadmin = this.readCookie('isAdmin');
        if (this.isadmin === "true") {
            this.loggedIsAdmin = true;
        }
        else {
            this.loggedIsAdmin = false;
        }
    };
    AboutPage.prototype.addUser = function (data) {
        var _this = this;
        var userId_value = this.readCookie('user');
        console.log(userId_value);
        data._id = userId_value;
        this.userpr.appendUser(data).subscribe(function (allowed) {
            console.log(allowed);
            if (allowed.status == "ok") {
                _this.showOk("user registered");
                // this.events.publish('loadData');
                // this.viewCtrl.dismiss(allowed);
            }
            else {
                _this.showError("something wrong append");
            }
        }, function (error) {
            _this.showError(error);
        });
        /*let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle:'add '+data.userName+" "+data.email+" "+data.password,
          buttons: ['OK']
        });
        alert.present(prompt);*/
    };
    AboutPage.prototype.setAdmin = function (data) {
        // let userId_value = this.readCookie('user');
        // console.log(userId_value);
        // data._id = userId_value;
        var _this = this;
        console.log(data);
        this.userpr.setAdmin(data).subscribe(function (res) {
            console.log(res);
            if (res.status == "ok") {
                _this.showOk("user is admin");
                var user_value = _this.readCookie('token');
                console.log('token = ' + user_value);
                _this.user(user_value);
                var date = new Date();
                date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toUTCString();
                document.cookie = "isAdmin=" + true + ";expires=" + expires + ";";
            }
            else {
                _this.showError("something wrong append");
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    AboutPage.prototype.setUser = function (data) {
        // let userId_value = this.readCookie('user');
        // console.log(userId_value);
        // data._id = userId_value;
        var _this = this;
        console.log(data);
        this.userpr.setUser(data).subscribe(function (res) {
            console.log(res);
            if (res.status == "ok") {
                _this.showOk("user is admin");
                var user_value = _this.readCookie('token');
                console.log('token = ' + user_value);
                var date = new Date();
                date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toUTCString();
                document.cookie = "isAdmin=" + true + ";expires=" + expires + ";";
                _this.user(user_value);
            }
            else {
                _this.showError("something wrong append");
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    AboutPage.prototype.changeAvatar = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Replace Avatar',
            subTitle: "take a picture or choose from album",
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        console.log('Camera clicked');
                        _this.takePics();
                    }
                }, {
                    text: 'Album',
                    handler: function () {
                        console.log('Album clicked');
                        _this.choosePics();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    AboutPage.prototype.takePics = function () {
        var _this = this;
        var options = {
            quality: 100,
            /*
                destinationType: this.camera.DestinationType.DATA_URL,
            */
            destinationType: this.camera.DestinationType.NATIVE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: false
        };
        this.camera.getPicture(options).then(function (imageData) {
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
            _this.avatarUrl = imageData.replace("assets-library://", "cdvfile://localhost/assets-library/");
            _this.userpr.userAvatar(imageData).subscribe(function (res) {
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
        }, function (err) {
            // Handle error
        });
    };
    AboutPage.prototype.choosePics = function () {
        var _this = this;
        var options = {
            quality: 100,
            /*
                destinationType: this.camera.DestinationType.DATA_URL,
            */
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            console.log(imageData);
            console.log("#####################################");
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.base64Image);
        }, function (err) {
            // Handle error
        });
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Account\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n<!--<pre>{{userData | json}}</pre>-->\n  <ion-list>\n    <ion-item-divider color="light"><strong>Baby</strong></ion-item-divider>\n      <ion-item>\n        <ion-avatar item-start>\n          <button class="avatarBtn" *ngIf="loggedIsAdmin" ion-button (click)="changeAvatar()" clear>\n            <img [src]="avatarUrl"  />\n          </button>\n        </ion-avatar>\n\n      <h4><strong>{{userData?.babyName | uppercase}}</strong></h4>\n      <p>{{userData?.dateOfBirth | date:\'dd MMM yyyy\'}}</p>\n        <ion-badge>4.800 kg</ion-badge>\n\n        <button *ngIf="loggedIsAdmin" item-right   ion-button icon-left class="btnWeigh" (click)="showUpdateWeigh()" >\n          <ion-icon small name="ai-balance-scal"></ion-icon>\n          update\n        </button>\n      </ion-item>\n    <ion-item>\n      {{avatarUrl}}\n    </ion-item>\n    <div class="updateWeigh" *ngIf="showingUpdateWeigh">\n    <ion-item-divider color="light"><strong>Update Weigh</strong></ion-item-divider>\n\n\n      <ion-item *ngIf="babyWeigh" >\n        <ion-badge *ngIf="babyWeigh">{{babyWeigh / 1000}} kg</ion-badge>\n      </ion-item>\n      <ion-item>\n        <ion-range min="0" max="10000" step="25"   [(ngModel)]="babyWeigh" name="babyWeigh" color="secondary" pin="false">\n<!--\n          <ion-icon range-left small name="ai-biberon"></ion-icon>\n-->\n          <ion-label range-left>0</ion-label>\n          <ion-label range-right>10kg </ion-label>\n<!--\n          <ion-icon range-right large name="ai-biberon"></ion-icon>\n-->\n        </ion-range>\n\n      </ion-item>\n\n    <ion-item>\n\n      <button ion-button item-right icon-left class="btnWeigh" >\n        <ion-icon small name="md-archive"></ion-icon>\n        save\n      </button>\n    </ion-item>\n    </div>\n\n  </ion-list>\n\n  <ion-list>\n    <ion-item-divider color="light"><strong>Account logged as {{loggedAs | upperfirst}}</strong></ion-item-divider>\n\n    <ion-item>\n      <h3><strong>First User  :</strong></h3>\n        <p><strong>mail</strong> :{{userData?.mail}}</p>\n        <p><strong>user name</strong> :{{userData?.userName}}</p>\n    </ion-item>\n    <ion-item>\n      <h3>\n        <strong>User list :</strong>\n      </h3>\n    </ion-item>\n\n      <div *ngFor="let user of userData?.userSecondaire" >\n        <ion-item *ngIf="user._id && !user.isAdmin  ">\n          <!--{{user?.isAdmin}}-->\n        <p><strong>user Name</strong>: {{user?.userAssistUserName }}</p>\n        <p><strong>mail</strong>: {{user?.userAssistMail }}</p>\n      <button *ngIf="loggedIsAdmin" ion-button item-right icon-left (click)="setAdmin(user?._id)" >\n        <ion-icon small name="ios-key-outline"></ion-icon>\n        set it admin\n      </button>\n        </ion-item>\n      </div>\n\n    <ion-item>\n      <h3>\n        <strong>Admin list :</strong>\n      </h3>\n    </ion-item>\n\n    <div *ngFor="let user of userData?.userSecondaire" >\n      <ion-item *ngIf="user.isAdmin ">\n        <!--{{user?.isAdmin}}-->\n        <p><strong>user Name</strong>: {{user?.userAssistUserName }}</p>\n        <p><strong>mail</strong>: {{user?.userAssistMail }}</p>\n        <button *ngIf="(user?.userAssistUserName |upperfirst)  != (userData?.userName |upperfirst) && loggedIsAdmin" ion-button item-right icon-left (click)="setUser(user?._id)" >\n\n          <ion-icon small name="ios-key-outline"></ion-icon>\n          set it user\n        </button>\n      </ion-item>\n    </div>\n\n\n  </ion-list>\n\n\n  <ion-list *ngIf="loggedIsAdmin">\n    <ion-item-divider color="light"><strong>Update First User</strong></ion-item-divider>\n    <ion-item>\n      <ion-label stacked>Mail</ion-label>\n      <ion-input type="text" placeholder="{{userData?.mail}}"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>User Name</ion-label>\n      <ion-input type="text" placeholder="{{userData?.userName}}"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>Password</ion-label>\n      <ion-input type="password" placeholder="******************"></ion-input>\n    </ion-item>\n    <ion-item>\n      <button ion-button item-right icon-left class="btnWeigh" >\n        <ion-icon small name="md-archive"></ion-icon>\n        save\n      </button>\n    </ion-item>\n  </ion-list>\n\n  <ion-list *ngIf="loggedIsAdmin">\n    <ion-item-divider color="light"><strong>Add User</strong></ion-item-divider>\n    <form (ngSubmit)="addUser(addUserForm.value)" [formGroup]="addUserForm">\n    <ion-item>\n      <ion-label stacked>Email</ion-label>\n      <ion-input type="email" placeholder="Email" name="email"  [formControl]="addUserForm.controls.email"  required></ion-input>\n    </ion-item>\n      <ion-item>\n        <ion-label stacked>User Name</ion-label>\n        <ion-input type="text" placeholder="User Name" name="userName"  [formControl]="addUserForm.controls.userName"  required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Role</ion-label>\n        <ion-select [formControl]="addUserForm.controls.role" name="role">\n          <ion-option value="Father">Father</ion-option>\n          <ion-option value="Mother">Mother</ion-option>\n          <ion-option value="Grandfather">Grandfather</ion-option>\n          <ion-option value="Grandmother">Grandmother</ion-option>\n          <ion-option value="Nurse">Nurse</ion-option>\n        </ion-select>\n      </ion-item>\n    <ion-item>\n      <ion-label stacked>Password</ion-label>\n      <ion-input type="password" placeholder="Password" name="password" [formControl]="addUserForm.controls.password" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <button type="submit" ion-button item-right icon-left class="btnWeigh" >\n        <ion-icon small name="md-archive"></ion-icon>\n        save\n      </button>\n    </ion-item>\n    </form>\n  </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserServiceProvider = (function () {
    function UserServiceProvider(http) {
        this.http = http;
        this.apiRoot = "http://mejdan.fr/api";
        this.urlLogin = this.apiRoot + "/feeding/account/cookie/login";
        this.urlAddSecondary = this.apiRoot + "/user/feeding/add/user/secondary";
        this.urlSetAdmin = this.apiRoot + "/user/feeding/set/admin";
        this.urlSetUser = this.apiRoot + "/user/feeding/set/user";
        this.urlSetUserAvatar = this.apiRoot + "/user/feeding/set/user/avatar";
    }
    /**
     * Login
     * @param credentials
     * @returns {any}
     */
    UserServiceProvider.prototype.user = function (credentials) {
        var _this = this;
        console.log('get user service');
        console.log(credentials);
        if (credentials.token === null) {
            console.log('user token null');
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                // At this point make a request to your backend to make a real check!
                _this.http.post(_this.urlLogin, { cookie: credentials }).subscribe(function (res) {
                    _this.result = res;
                    if (_this.result.status === "ok") {
                        console.log('user service ok');
                        observer.next(_this.result);
                        observer.complete();
                    }
                    else if (_this.result.status === "ko") {
                        console.log('user service ko');
                        sessionStorage.setItem("message", "error loggin");
                        observer.next(_this.result);
                    }
                });
            });
        }
    };
    UserServiceProvider.prototype.userAvatar = function (data) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlSetUserAvatar, { cookie: data }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('user avatar service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('user avatar service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
    };
    UserServiceProvider.prototype.appendUser = function (credentials) {
        var _this = this;
        console.log('append user service');
        console.log(credentials);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlAddSecondary, { data: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('user service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('user service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
    };
    UserServiceProvider.prototype.setAdmin = function (credentials) {
        var _this = this;
        console.log('set admin user service');
        console.log(credentials);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlSetAdmin, { data: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('user service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('user service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
    };
    UserServiceProvider.prototype.setUser = function (credentials) {
        var _this = this;
        console.log('set admin user service');
        console.log(credentials);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlSetUser, { data: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('user service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('user service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
    };
    UserServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], UserServiceProvider);
    return UserServiceProvider;
}());

//# sourceMappingURL=user-service.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_feed_feed__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feed_detail_feed_detail__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(events, navCtrl, modalCtrl, alertCtrl, elRef, feed, loadingCtrl) {
        var _this = this;
        this.events = events;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.elRef = elRef;
        this.feed = feed;
        this.loadingCtrl = loadingCtrl;
        this.showAddBottle = false;
        this.showAddBreast = false;
        this.centi = 0; // initialise les dixtièmes
        this.secon = 0; //initialise les secondes
        this.minu = 0; //initialise les minutes
        this.time = "00:00";
        this.time2 = "00:00";
        this.centi2 = 0; // initialise les dixtièmes
        this.secon2 = 0; //initialise les secondes
        this.minu2 = 0; //initialise les minutes
        this.rightBreastStarted = false;
        this.leftBreastStarted = false;
        this.data = {};
        this.dataBreast = {};
        this.total = 0;
        this.loginView = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        var loggedAs = this.readCookie('loggedAs');
        if (loggedAs) {
            console.log('is logged');
            __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].interval((1000 * 60) * 15).takeWhile(function () { return true; }).subscribe(function () { return _this.update(); });
        }
        // this.listenEvents();
        // this.listenLogEvents()
        this.loginView.onDidDismiss(function (data) {
            _this.getAllFeedRequest();
        });
    }
    HomePage.prototype.listenEvents = function () {
        var _this = this;
        this.events.subscribe('reloadDetails', function () {
            _this.getAllFeedRequest();
        });
    };
    HomePage.prototype.listenLogEvents = function () {
        var _this = this;
        this.events.subscribe('loadData', function () {
            var userId_value = _this.readCookie('user');
            _this.data.user_id = userId_value;
            var now = new Date();
            var d = now.getDate();
            var mo = (((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1));
            var y = now.getFullYear();
            _this.data.feedDate = d + "/" + mo + "/" + y;
            _this.getAllFeedRequest();
        });
    };
    HomePage.prototype.addBottleFeed = function () {
        this.showAddBottle = !this.showAddBottle;
    };
    HomePage.prototype.addBreastFeed = function () {
        this.showAddBreast = !this.showAddBreast;
    };
    HomePage.prototype.newFeeds = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        loading.present();
        data.userId = this.readCookie('user');
        data.rightBreastData = 0;
        data.leftBreastData = 0;
        data.feedType = "bottle-feeding";
        if (!data.milkWeigh || data.milkWeigh < 1) {
            this.showError('something missed', "please add feeding bottle quantity :)");
        }
        else {
            if (!data.dateType || data.dateType == false) {
                data.dateType = false;
                var now = new Date();
                var h = now.getHours();
                var m = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
                var d = now.getDate();
                var mo = (((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1));
                var y = now.getFullYear();
                data.feedDate = d + "/" + mo + "/" + y;
                data.feedHour = h + ":" + m;
            }
            else {
                data.feedDate = this.elRef.nativeElement.querySelector('.datetime-text').innerHTML;
            }
            console.log(data);
            /**
             * request
             */
            this.feed.newfeed(data).subscribe(function (allowed) {
                if (allowed.status == "ok") {
                    loading.dismiss();
                    _this.showOk("new feed added");
                    _this.getAllFeedRequest();
                }
                else {
                    loading.dismiss();
                    _this.showError("error", 'please retry an error occurred');
                }
            }, function (error) {
                loading.dismiss();
                _this.showError("error", 'please retry an error occurred');
            });
        }
    };
    HomePage.prototype.showOk = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    HomePage.prototype.presentLoginView = function () {
        this.loginView.present();
    };
    HomePage.prototype.ngOnInit = function () {
        /*let loggedAs = this.readCookie('loggedAs');
        if(!loggedAs){
          this.presentLoginView();
          console.log('isn\'t logged');
        }else{
          console.log('is logged');
          this.getAllFeedRequest()
        }*/
    };
    HomePage.prototype.ionViewCanEnter = function () {
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var loggedAs = this.readCookie('loggedAs');
        if (!loggedAs) {
            this.presentLoginView();
            console.log('isn\'t logged');
        }
        else {
            console.log('is logged');
            this.getAllFeedRequest();
        }
    };
    HomePage.prototype.getAllFeedRequest = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        var userId_value = this.readCookie('user');
        var now = new Date();
        var d = (((now.getDate() + 1) < 10 ? '0' : '') + (now.getDate()));
        if (d == "9") {
            d = "09";
        }
        else if (d == "8") {
            d = "08";
        }
        else if (d == "7") {
            d = "07";
        }
        else if (d == "6") {
            d = "06";
        }
        else if (d == "5") {
            d = "05";
        }
        else if (d == "4") {
            d = "04";
        }
        else if (d == "3") {
            d = "03";
        }
        else if (d == "2") {
            d = "02";
        }
        else if (d == "1") {
            d = "01";
        }
        console.log("day" + d);
        var mo = (((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1));
        var y = now.getFullYear();
        this.data.user_id = userId_value;
        this.data.feedDate = d + "/" + mo + "/" + y;
        console.log(this.data.feedDate);
        loading.present();
        this.feed.todayAll(this.data).subscribe(function (allowed) {
            if (allowed.status == "ok") {
                loading.dismiss();
                _this.feeds = allowed.alldayfeeds;
                _this.total = 0;
                for (var i = 0; i < _this.feeds.length; i++) {
                    if (!_this.feeds[i].quantity) {
                        _this.feeds[i].quantity = 0;
                    }
                    _this.total += _this.feeds[i].quantity;
                }
            }
            else {
                loading.dismiss();
                _this.showError("error", 'please retry an error occurred');
            }
        }, function (error) {
            loading.dismiss();
            _this.showError("error", 'please retry an error occurred');
        });
    };
    HomePage.prototype.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    HomePage.prototype.goToUpdatePage = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Loading Please Wait...'
        });
        loading.present();
        setTimeout(function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__feed_detail_feed_detail__["a" /* FeedDetailPage */], {
                data: data
            });
        }, 1000);
        setTimeout(function () {
            loading.dismiss();
        }, 1000);
    };
    HomePage.prototype.deleteFeed = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        loading.present();
        this.feed.deleteFeed(data).subscribe(function (allowed) {
            if (allowed.status == "ok") {
                loading.dismiss();
                _this.showOk("feed deleted");
                _this.getAllFeedRequest();
            }
            else {
                loading.dismiss();
                _this.showError("error", 'please retry an error occurred');
            }
        }, function (error) {
            loading.dismiss();
            _this.showError("error", 'please retry an error occurred');
        });
    };
    HomePage.prototype.showError = function (title, text) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    HomePage.prototype.update = function () {
        this.getAllFeedRequest();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad home');
        var loggedAs = this.readCookie('loggedAs');
        /* if(!loggedAs){
           this.presentLoginView();
           console.log('isn\'t logged');
         }else{
           console.log('is logged');
           this.getAllFeedRequest()
         }*/
    };
    HomePage.prototype.doRefresh = function (refresher) {
        // console.log('Begin async operation', refresher);
        this.getAllFeedRequest();
        setTimeout(function () {
            // console.log('Async operation has ended');
            refresher.complete();
        }, 1000);
    };
    HomePage.prototype.rightBreastTimer = function () {
        this.rightBreastStarted = !this.rightBreastStarted;
        this.chrono();
    };
    HomePage.prototype.rightBreastTimerStop = function () {
        this.rightBreastStarted = !this.rightBreastStarted;
        clearTimeout(this.compte);
    };
    HomePage.prototype.leftBreastTimer = function () {
        this.leftBreastStarted = !this.leftBreastStarted;
        this.chrono2();
    };
    HomePage.prototype.leftBreastTimerStop = function () {
        this.leftBreastStarted = !this.leftBreastStarted;
        clearTimeout(this.compte2);
    };
    HomePage.prototype.chrono = function () {
        var _this = this;
        this.centi++; //incrémentation des dixièmes de 1
        if (this.centi > 9) {
            this.centi = 0;
            this.secon++;
        } //si les dixièmes > 9, on les réinitialise à 0 et on incrémente les secondes de 1
        if (this.secon > 59) {
            this.secon = 0;
            this.minu++;
        } //si les secondes > 59,
        // this.compte=setTimeout('this.chrono()',100)
        this.compte = setTimeout(function () {
            _this.chrono();
            _this.time = ((_this.minu < 10 ? '0' : '') + _this.minu) + ":" + ((_this.secon < 10 ? '0' : '') + _this.secon);
        }, 100);
    };
    HomePage.prototype.chrono2 = function () {
        var _this = this;
        this.centi2++; //incrémentation des dixièmes de 1
        if (this.centi2 > 9) {
            this.centi2 = 0;
            this.secon2++;
        } //si les dixièmes > 9, on les réinitialise à 0 et on incrémente les secondes de 1
        if (this.secon2 > 59) {
            this.secon2 = 0;
            this.minu2++;
        } //si les secondes > 59,
        // this.compte=setTimeout('this.chrono()',100)
        this.compte2 = setTimeout(function () {
            _this.chrono2();
            _this.time2 = ((_this.minu2 < 10 ? '0' : '') + _this.minu2) + ":" + ((_this.secon2 < 10 ? '0' : '') + _this.secon2);
        }, 100);
    };
    HomePage.prototype.rasee = function () {
        clearTimeout(this.compte); //arrête la fonction chrono()
        this.centi = 0;
        this.secon = 0;
        this.minu = 0;
        this.centi2 = 0;
        this.secon2 = 0;
        this.minu2 = 0;
        this.time = "00:00";
        this.time2 = "00:00";
    };
    HomePage.prototype.saveBreast = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "circles",
            content: 'Please wait...'
        });
        /***
         * BREAST FEED
         */
        loading.present();
        this.dataBreast.userId = this.readCookie('user');
        var now = new Date();
        var h = now.getHours();
        var m = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        var d = now.getDate();
        var mo = (((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1));
        var y = now.getFullYear();
        this.dataBreast.feedDate = d + "/" + mo + "/" + y;
        this.dataBreast.feedHour = h + ":" + m;
        this.dataBreast.feedType = "breast-feeding";
        this.dataBreast.rightBreastData = this.time;
        this.dataBreast.leftBreastData = this.time2;
        this.dataBreast.quantity = 0;
        // console.log(this.dataBreast);
        this.feed.newfeed(this.dataBreast).subscribe(function (allowed) {
            console.log(allowed);
            if (allowed.status == "ok") {
                loading.dismiss();
                _this.showOk("new feed added");
                _this.getAllFeedRequest();
            }
            else {
                loading.dismiss();
                _this.showError("error", 'please retry an error occurred');
            }
        }, function (error) {
            loading.dismiss();
            _this.showError("error", 'please retry an error occurred');
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title width-67><img src="assets/imgs/milkNav.png" style="width: 60px"/></ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n    <ion-item>\n      <button *ngIf="!showAddBottle" ion-button icon-left (click)="addBottleFeed()">\n        <ion-icon name="ios-add-circle-outline"></ion-icon>\n        new bottle feeds\n      </button>\n      <button *ngIf="showAddBottle" ion-button icon-left (click)="addBottleFeed()">\n        <ion-icon name="ios-close-circle-outline"></ion-icon>\n        close\n      </button>\n\n      <button item-right *ngIf="!showAddBreast" ion-button icon-left (click)="addBreastFeed()">\n        <ion-icon name="ios-add-circle-outline"></ion-icon>\n        new breast feeding\n      </button>\n      <button item-right *ngIf="showAddBreast" ion-button icon-left (click)="addBreastFeed()">\n        <ion-icon name="ios-close-circle-outline"></ion-icon>\n        close\n      </button>\n\n    </ion-item>\n      <!--\n          ADD BOTTLE FEED\n       -->\n    <div class="addOne" *ngIf="showAddBottle">\n  <form #form="ngForm" id="feed-form" class="text-left" (ngSubmit)="newFeeds(form.value)">\n\n    <ion-item>\n      Quantity :\n      <ion-badge item-end *ngIf="milkWeigh">{{milkWeigh}} ml</ion-badge>\n    </ion-item>\n\n    <ion-item>\n\n      <ion-range min="0" max="360" step="5" [(ngModel)]="milkWeigh" name="milkWeigh" color="secondary" pin="true">\n        <ion-icon range-left small name="ai-biberon"></ion-icon>\n        <ion-label range-left>0</ion-label>\n        <ion-label range-right>360</ion-label>\n        <ion-icon range-right large name="ai-biberon"></ion-icon>\n      </ion-range>\n    </ion-item>\n  <ion-item>\n    <ion-label *ngIf="!dateType">now (date/hour) </ion-label>\n    <ion-label *ngIf="dateType"> custom (date/hour)</ion-label>\n    <ion-toggle [(ngModel)]="dateType" name="dateType" checked="true"></ion-toggle>\n  </ion-item>\n\n  <ion-item *ngIf="dateType">\n    <ion-label>Feed Date</ion-label>\n    <ion-badge item-end *ngIf="!feedDate">add</ion-badge>\n    <ion-datetime  displayFormat="DD/MM/YYYY" pickerFormat="DD MM YYYY" [(ngModel)]="feedDate" name="feedDate"></ion-datetime>\n  </ion-item>\n\n  <ion-item *ngIf="dateType">\n    <ion-label>Feed Hour </ion-label>\n    <ion-badge item-end *ngIf="!feedHour">add</ion-badge>\n    <ion-datetime  displayFormat="HH:mm" pickerFormat="HH mm " [(ngModel)]="feedHour" name="feedHour"></ion-datetime>\n  </ion-item>\n\n  <ion-item>\n    <button item-right="" type="submit" ion-button icon-left>\n      <ion-icon  name="md-archive"></ion-icon>\n      save\n    </button>\n  </ion-item>\n  </form>\n</div>\n\n      <!--\n          ADD BREAST FEED\n          ios-timer-outline\n       -->\n    <div class="addTwo" *ngIf="showAddBreast">\n      <ion-list>\n        <ion-item>\n          <h4 ion-text>StopWatch Feeds</h4>\n        </ion-item>\n        <ion-item>\n          <ion-row>\n            <ion-col col-6>\n              <p class="timer-text" ion-text item-left>right breast</p>\n              <ion-badge *ngIf="!rightBreastStarted" class="timer-badge" item-left color="secondary">{{time}}</ion-badge>\n              <ion-badge *ngIf="rightBreastStarted"  class="timer-badge" item-left color="danger"   >{{time}}</ion-badge>\n            </ion-col>\n            <ion-col col-6>\n              <p class="timer-text" ion-text item-right>left breast</p>\n              <ion-badge *ngIf="!leftBreastStarted" class="timer-badge" item-left color="secondary">{{time2}}</ion-badge>\n              <ion-badge *ngIf="leftBreastStarted"  class="timer-badge" item-left color="danger"   >{{time2}}</ion-badge>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-item>\n            <button item-end ion-button class="submit-btn" (click)="rasee()" >Clear All</button>\n            </ion-item>\n          </ion-row>\n        </ion-item>\n      <form>\n\n        <ion-item>\n          <ion-row>\n\n              <button *ngIf="!rightBreastStarted" ion-button full icon-left (click)="rightBreastTimer()">\n                <ion-icon name="ios-timer-outline">\n                </ion-icon>\n                Start Right Breast\n              </button>\n            <button *ngIf="rightBreastStarted" ion-button full icon-left (click)="rightBreastTimerStop()">\n              <ion-icon name="ios-timer-outline">\n              </ion-icon>\n              Stop Right Breast\n            </button>\n\n              <button *ngIf="!leftBreastStarted" ion-button full icon-left (click)="leftBreastTimer()">\n                <ion-icon name="ios-timer-outline">\n                </ion-icon>\n                Start Left Breast\n              </button>\n            <button *ngIf="leftBreastStarted" ion-button full icon-left (click)="leftBreastTimerStop()">\n              <ion-icon name="ios-timer-outline">\n              </ion-icon>\n              Stop Left Breast\n            </button>\n\n          </ion-row>\n        </ion-item>\n\n\n        <ion-item>\n           <button item-end ion-button class="submit-btn" (click)="saveBreast()" >Save</button>\n        </ion-item>\n\n      </form>\n      </ion-list>\n    </div>\n\n\n\n\n\n    <!--\n        FEED LIST\n     -->\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n      <ion-refresher-content>\n      </ion-refresher-content>\n    </ion-refresher>\n    <ion-item-divider color="light"><strong>Today feeds</strong>\n      <ion-badge *ngIf="total >= 1000" item-end >{{total / 10}} cl </ion-badge>\n      <ion-badge *ngIf="total < 1000" item-end >{{total}} ml</ion-badge>\n    </ion-item-divider>\n\n\n    <ion-item-sliding *ngFor="let feed of feeds | orderBy: \'savedAtHours\'">\n    <ion-item>\n<p>{{feed?.savedAtHours}}</p> <p ion-text>{{feed?.feedType}}</p>\n      <ion-badge *ngIf="feed?.feedType != \'breast-feeding\' " item-end>{{feed?.quantity}} ml</ion-badge>\n      <ion-badge color="light" *ngIf="feed?.feedType == \'breast-feeding\' " item-end>right: {{feed?.rightBreastData}}min</ion-badge>\n      <ion-badge color="light" *ngIf="feed?.feedType == \'breast-feeding\' " item-end>left: {{feed?.leftBreastData }}min</ion-badge>\n    </ion-item>\n      <ion-item-options side="righ">\n        <button ion-button color="primary" (click)="goToUpdatePage(feed)">\n          <ion-icon small name="ios-create-outline"></ion-icon>\n          update\n        </button>\n        <button ion-button color="danger" (click)="deleteFeed(feed._id)">\n          <ion-icon small name="ios-close-circle-outline"></ion-icon>\n          delete\n        </button>\n      </ion-item-options>\n      </ion-item-sliding>\n\n\n\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_3__providers_feed_feed__["a" /* FeedProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(567);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(889);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_about_about__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_login_service_login_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_user_service_user_service__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_list_list__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_feed_feed__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular_pipes__ = __webpack_require__(890);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_feed_detail_feed_detail__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_register_register__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_charts__ = __webpack_require__(891);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_all_data_detail_all_data_detail__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_messenger_messenger__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_file__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_feed_detail_feed_detail__["a" /* FeedDetailPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_all_data_detail_all_data_detail__["a" /* AllDataDetailPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_messenger_messenger__["a" /* MessengerPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/all-data-detail/all-data-detail.module#AllDataDetailPageModule', name: 'AllDataDetailPage', segment: 'all-data-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/feed-detail/feed-detail.module#FeedDetailPageModule', name: 'FeedDetailPage', segment: 'feed-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/list/list.module#ListPageModule', name: 'ListPage', segment: 'list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/messenger/messenger.module#MessengerPageModule', name: 'MessengerPage', segment: 'messenger', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_17_angular_pipes__["a" /* NgPipesModule */],
                __WEBPACK_IMPORTED_MODULE_20_ng2_charts__["ChartsModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_feed_detail_feed_detail__["a" /* FeedDetailPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_all_data_detail_all_data_detail__["a" /* AllDataDetailPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_messenger_messenger__["a" /* MessengerPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_login_service_login_service__["a" /* LoginServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_user_service_user_service__["a" /* UserServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_feed_feed__["a" /* FeedProvider */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_file__["a" /* File */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the FeedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FeedProvider = (function () {
    function FeedProvider(http) {
        this.http = http;
        this.apiRoot = "http://mejdan.fr/api";
        this.urlNewFeed = this.apiRoot + "/user/feeding/new";
        this.urlAllDayFeed = this.apiRoot + "/user/feeding/all";
        this.urlAllDayBottleFeed = this.apiRoot + "/user/feeding/all/bottle";
        this.urlAllDayBreastFeed = this.apiRoot + "/user/feeding/all/breast";
        this.urlDeleteFeed = this.apiRoot + "/user/feeding/delete/one";
        this.urlUpdateFeed = this.apiRoot + "/user/feeding/update/one";
        this.urlAllFeed = this.apiRoot + "/user/feeding/allFeed";
        console.log('Hello Feed Provider Provider');
    }
    FeedProvider.prototype.newfeed = function (credentials) {
        var _this = this;
        console.log('new feeds service');
        console.log(credentials);
        /* if (credentials.token === null) {
           console.log('user token null');
           return Observable.throw("Please insert credentials");
         }else {*/
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlNewFeed, { feed: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('new feeds service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('new feeds service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
        /*}
        */
    };
    FeedProvider.prototype.todayAll = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlAllDayFeed, { data: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('all feeds service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('all feeds service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
    };
    FeedProvider.prototype.todayAllBottle = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlAllDayBottleFeed, { data: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('all feeds service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('all feeds service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
    };
    FeedProvider.prototype.todayAllBreast = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlAllDayBreastFeed, { data: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('all feeds service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('all feeds service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
    };
    FeedProvider.prototype.deleteFeed = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlDeleteFeed, { data: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('delete feeds service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('delete feeds service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
    };
    FeedProvider.prototype.updateFeed = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlUpdateFeed, { data: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('update feeds service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('update feeds service ko');
                    sessionStorage.setItem("message", "error update");
                    observer.next(_this.result);
                }
            });
        });
    };
    FeedProvider.prototype.AllFeed = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.urlAllFeed, { data: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('all feeds service ok');
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('all feeds service ko');
                    sessionStorage.setItem("message", "error loggin");
                    observer.next(_this.result);
                }
            });
        });
    };
    FeedProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], FeedProvider);
    return FeedProvider;
}());

//# sourceMappingURL=feed.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(271);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LoginServiceProvider = (function () {
    function LoginServiceProvider(http) {
        this.http = http;
        this.apiRoot = "http://mejdan.fr/api";
        this.urlLogin = this.apiRoot + "/feeding/account/login";
        this.setRoleUrl = this.apiRoot + "/feeding/account/role";
        this.newUserUrl = this.apiRoot + "/feeding/account/new";
        this.addUserUrl = this.apiRoot + "/user/feeding/add/user/secondary";
    }
    LoginServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        console.log('login service');
        console.log(credentials.rememberMe);
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                // At this point make a request to your backend to make a real check!
                _this.http.post(_this.urlLogin, { mail: credentials.email, password: credentials.password }).subscribe(function (res) {
                    _this.result = res;
                    if (_this.result.status === "ok") {
                        console.log('login service ok');
                        console.log(_this.result);
                        sessionStorage.setItem("message", "success loggin");
                        sessionStorage.setItem("token", _this.result.token);
                        observer.next(_this.result);
                        observer.complete();
                        var date = new Date();
                        date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
                        var expires = "; expires=" + date.toUTCString();
                        document.cookie = "user=" + _this.result.user._id + ";expires=" + expires + ";";
                        document.cookie = "loggedAs=" + _this.result.userLogged.userAssistUserName + ";expires=" + expires + ";";
                        document.cookie = "isAdmin=" + _this.result.userLogged.isAdmin + ";expires=" + expires + ";";
                        document.cookie = "token=" + _this.result.token + ";expires=" + expires + ";";
                        if (credentials.rememberMe === true) {
                            var date_1 = new Date();
                            date_1.setTime(date_1.getTime() + (360 * 24 * 60 * 60 * 1000));
                            var expires_1 = "; expires=" + date_1.toUTCString();
                            document.cookie = "tokenAuto=" + _this.result.token + ";expires=" + expires_1 + ";";
                        }
                    }
                    else if (_this.result.status === "ko") {
                        console.log('login service ko');
                        sessionStorage.setItem("message", "error loggin");
                        observer.next(_this.result);
                    }
                });
            });
        }
    };
    LoginServiceProvider.prototype.register = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            _this.http.post(_this.newUserUrl, { users: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('create user service ok');
                    console.log(_this.result);
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('login service ko');
                    observer.next(_this.result);
                }
            });
            _this.http.post(_this.addUserUrl, { users: credentials }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('create user service ok');
                    console.log(_this.result);
                    observer.next(_this.result);
                    observer.complete();
                }
                else if (_this.result.status === "ko") {
                    console.log('login service ko');
                    observer.next(_this.result);
                }
            });
        });
    };
    LoginServiceProvider.prototype.setRole = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // At this point make a request to your backend to make a real check!
            var userNameCred = _this.readCookie('loggedAs');
            _this.http.post(_this.setRoleUrl, { userName: userNameCred }).subscribe(function (res) {
                _this.result = res;
                if (_this.result.status === "ok") {
                    console.log('set role service ok');
                    console.log(_this.result.isAdmin);
                    observer.next(_this.result);
                    observer.complete();
                    var date = new Date();
                    date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toUTCString();
                    document.cookie = "isAdmin=" + _this.result.isAdmin + ";expires=" + expires + ";";
                }
                else if (_this.result.status === "ko") {
                    console.log('login service ko');
                    observer.next(_this.result);
                }
            });
        });
    };
    LoginServiceProvider.prototype.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    LoginServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], LoginServiceProvider);
    return LoginServiceProvider;
}());

//# sourceMappingURL=login-service.js.map

/***/ }),

/***/ 924:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 447,
	"./af.js": 447,
	"./ar": 448,
	"./ar-dz": 449,
	"./ar-dz.js": 449,
	"./ar-kw": 450,
	"./ar-kw.js": 450,
	"./ar-ly": 451,
	"./ar-ly.js": 451,
	"./ar-ma": 452,
	"./ar-ma.js": 452,
	"./ar-sa": 453,
	"./ar-sa.js": 453,
	"./ar-tn": 454,
	"./ar-tn.js": 454,
	"./ar.js": 448,
	"./az": 455,
	"./az.js": 455,
	"./be": 456,
	"./be.js": 456,
	"./bg": 457,
	"./bg.js": 457,
	"./bn": 458,
	"./bn.js": 458,
	"./bo": 459,
	"./bo.js": 459,
	"./br": 460,
	"./br.js": 460,
	"./bs": 461,
	"./bs.js": 461,
	"./ca": 462,
	"./ca.js": 462,
	"./cs": 463,
	"./cs.js": 463,
	"./cv": 464,
	"./cv.js": 464,
	"./cy": 465,
	"./cy.js": 465,
	"./da": 466,
	"./da.js": 466,
	"./de": 467,
	"./de-at": 468,
	"./de-at.js": 468,
	"./de-ch": 469,
	"./de-ch.js": 469,
	"./de.js": 467,
	"./dv": 470,
	"./dv.js": 470,
	"./el": 471,
	"./el.js": 471,
	"./en-au": 472,
	"./en-au.js": 472,
	"./en-ca": 473,
	"./en-ca.js": 473,
	"./en-gb": 474,
	"./en-gb.js": 474,
	"./en-ie": 475,
	"./en-ie.js": 475,
	"./en-nz": 476,
	"./en-nz.js": 476,
	"./eo": 477,
	"./eo.js": 477,
	"./es": 478,
	"./es-do": 479,
	"./es-do.js": 479,
	"./es.js": 478,
	"./et": 480,
	"./et.js": 480,
	"./eu": 481,
	"./eu.js": 481,
	"./fa": 482,
	"./fa.js": 482,
	"./fi": 483,
	"./fi.js": 483,
	"./fo": 484,
	"./fo.js": 484,
	"./fr": 485,
	"./fr-ca": 486,
	"./fr-ca.js": 486,
	"./fr-ch": 487,
	"./fr-ch.js": 487,
	"./fr.js": 485,
	"./fy": 488,
	"./fy.js": 488,
	"./gd": 489,
	"./gd.js": 489,
	"./gl": 490,
	"./gl.js": 490,
	"./gom-latn": 491,
	"./gom-latn.js": 491,
	"./he": 492,
	"./he.js": 492,
	"./hi": 493,
	"./hi.js": 493,
	"./hr": 494,
	"./hr.js": 494,
	"./hu": 495,
	"./hu.js": 495,
	"./hy-am": 496,
	"./hy-am.js": 496,
	"./id": 497,
	"./id.js": 497,
	"./is": 498,
	"./is.js": 498,
	"./it": 499,
	"./it.js": 499,
	"./ja": 500,
	"./ja.js": 500,
	"./jv": 501,
	"./jv.js": 501,
	"./ka": 502,
	"./ka.js": 502,
	"./kk": 503,
	"./kk.js": 503,
	"./km": 504,
	"./km.js": 504,
	"./kn": 505,
	"./kn.js": 505,
	"./ko": 506,
	"./ko.js": 506,
	"./ky": 507,
	"./ky.js": 507,
	"./lb": 508,
	"./lb.js": 508,
	"./lo": 509,
	"./lo.js": 509,
	"./lt": 510,
	"./lt.js": 510,
	"./lv": 511,
	"./lv.js": 511,
	"./me": 512,
	"./me.js": 512,
	"./mi": 513,
	"./mi.js": 513,
	"./mk": 514,
	"./mk.js": 514,
	"./ml": 515,
	"./ml.js": 515,
	"./mr": 516,
	"./mr.js": 516,
	"./ms": 517,
	"./ms-my": 518,
	"./ms-my.js": 518,
	"./ms.js": 517,
	"./my": 519,
	"./my.js": 519,
	"./nb": 520,
	"./nb.js": 520,
	"./ne": 521,
	"./ne.js": 521,
	"./nl": 522,
	"./nl-be": 523,
	"./nl-be.js": 523,
	"./nl.js": 522,
	"./nn": 524,
	"./nn.js": 524,
	"./pa-in": 525,
	"./pa-in.js": 525,
	"./pl": 526,
	"./pl.js": 526,
	"./pt": 527,
	"./pt-br": 528,
	"./pt-br.js": 528,
	"./pt.js": 527,
	"./ro": 529,
	"./ro.js": 529,
	"./ru": 530,
	"./ru.js": 530,
	"./sd": 531,
	"./sd.js": 531,
	"./se": 532,
	"./se.js": 532,
	"./si": 533,
	"./si.js": 533,
	"./sk": 534,
	"./sk.js": 534,
	"./sl": 535,
	"./sl.js": 535,
	"./sq": 536,
	"./sq.js": 536,
	"./sr": 537,
	"./sr-cyrl": 538,
	"./sr-cyrl.js": 538,
	"./sr.js": 537,
	"./ss": 539,
	"./ss.js": 539,
	"./sv": 540,
	"./sv.js": 540,
	"./sw": 541,
	"./sw.js": 541,
	"./ta": 542,
	"./ta.js": 542,
	"./te": 543,
	"./te.js": 543,
	"./tet": 544,
	"./tet.js": 544,
	"./th": 545,
	"./th.js": 545,
	"./tl-ph": 546,
	"./tl-ph.js": 546,
	"./tlh": 547,
	"./tlh.js": 547,
	"./tr": 548,
	"./tr.js": 548,
	"./tzl": 549,
	"./tzl.js": 549,
	"./tzm": 550,
	"./tzm-latn": 551,
	"./tzm-latn.js": 551,
	"./tzm.js": 550,
	"./uk": 552,
	"./uk.js": 552,
	"./ur": 553,
	"./ur.js": 553,
	"./uz": 554,
	"./uz-latn": 555,
	"./uz-latn.js": 555,
	"./uz.js": 554,
	"./vi": 556,
	"./vi.js": 556,
	"./x-pseudo": 557,
	"./x-pseudo.js": 557,
	"./yo": 558,
	"./yo.js": 558,
	"./zh-cn": 559,
	"./zh-cn.js": 559,
	"./zh-hk": 560,
	"./zh-hk.js": 560,
	"./zh-tw": 561,
	"./zh-tw.js": 561
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 924;

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_login_service_login_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(events, navCtrl, navParams, log, alertCtrl, modalCtrl, viewCtrl, fb) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.log = log;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.fb = fb;
        this.registerCredentials = { email: '', password: '' };
        this.loginForm = fb.group({
            'email': '',
            'password': '',
            'rememberMe': ''
        });
    }
    LoginPage.prototype.login = function (value) {
        var _this = this;
        /*this.showLoading();*/
        this.log.login(value).subscribe(function (allowed) {
            console.log(allowed);
            if (allowed.status == "ok") {
                _this.showOk("Login OK");
                _this.events.publish('loadData');
                _this.viewCtrl.dismiss(allowed);
            }
            else {
                _this.showError("Access Denied");
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    /*
      showLoading() {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
        });
        this.loading.present();
      }
    */
    LoginPage.prototype.showError = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    LoginPage.prototype.showOk = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    LoginPage.prototype.createAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title width-67><img src="assets/imgs/milkNav.png" style="width: 60px"/></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="login-content" padding>\n  <h4 text-center>login to your account</h4>\n  <hr>\n\n  <div class="login-box">\n    <form (ngSubmit)="login(loginForm.value)" [formGroup]="loginForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n\n            <ion-item>\n              <ion-input type="email" placeholder="Email" name="email"  [formControl]="loginForm.controls.email" value="n.medjdoub@gmail.com" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [formControl]="loginForm.controls.password" value="Nadjemilie77" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <div class="checkbox float-left">\n                <label>\n                  <input formControlName="rememberMe" type="checkbox" value="remember-me"> Remember me\n                </label>\n              </div>\n            </ion-item>\n\n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!loginForm.valid">Login</button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n    <button ion-button class="register-btn" block clear (click)="createAccount()">Create New Account</button>\n  </div>\n</ion-content>\n\n<!--<ion-content padding >\n<h4 text-center>login to your account</h4>\n  <hr>\n\n  <ion-content class="login-content" padding>\n    <div class="login-box">\n      <form  #registerForm="ngForm">\n        <ion-row>\n          <ion-col>\n            <ion-list inset>\n\n              <ion-item>\n                <ion-label color="primary" stacked>Email</ion-label>\n                <ion-input type="text" placeholder="Email" name="email" required></ion-input>\n              </ion-item>\n\n              <ion-item>\n                <ion-label color="primary" stacked>Password</ion-label>\n                <ion-input type="password" placeholder="Password" name="password"  required></ion-input>\n              </ion-item>\n\n            </ion-list>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col class="signup-col">\n            <button ion-button class="submit-btn" full type="submit" >Login</button>\n            <button ion-button class="register-btn" block clear >Create New Account</button>\n          </ion-col>\n        </ion-row>\n\n      </form>\n    </div>\n  </ion-content>\n\n</ion-content>-->\n'/*ion-inline-end:"/Users/nadjemmejdan/Downloads/milk-e-weigh/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_login_service_login_service__["a" /* LoginServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[562]);
//# sourceMappingURL=main.js.map