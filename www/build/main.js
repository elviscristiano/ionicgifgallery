webpackJsonp([0],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file_transfer__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StorageService = /** @class */ (function () {
    /**
     * Constructor - check if the storage directory exists. If not, the constructor creates it.
     *
     * @param platform Platform
     * @param transfer FileTransfer
     * @param file File
     * @param alertctl AlertController
     */
    function StorageService(platform, transfer, file, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.transfer = transfer;
        this.file = file;
        this.alertCtrl = alertCtrl;
        this.platform.ready()
            .then(function () {
            // make sure this is on a device
            if (!_this.platform.is('cordova')) {
                return false;
            }
            // ios and android storage directories
            if (_this.platform.is('ios')) {
                _this.storageDirectory = file.documentsDirectory;
            }
            else if (_this.platform.is('android')) {
                _this.storageDirectory = file.externalDataDirectory;
                file.checkDir(_this.storageDirectory, '')
                    .then(function (result) {
                    if (!result) {
                        file.createDir(_this.storageDirectory, '', true)
                            .then(function (result) {
                            console.log('Directory created.');
                        }, function (error) {
                            var alertFailure = _this.alertCtrl.create({
                                title: 'Server error: directory not created!',
                                buttons: ['Ok']
                            });
                            alertFailure.present();
                        });
                    }
                    else {
                        file.listDir(_this.storageDirectory, '')
                            .then(function (entries) { return entries.filter(function (value) {
                            _this.imgLocalUrl.push(_this.storageDirectory + value.name);
                        }); }, function (error) {
                            var alertFailure = _this.alertCtrl.create({
                                title: 'Nothing to show!',
                                buttons: ['Ok']
                            });
                            alertFailure.present();
                        });
                    }
                }, function (error) {
                    var alertFailure = _this.alertCtrl.create({
                        title: 'Server error: directory not exists!',
                        buttons: ['Ok']
                    });
                    alertFailure.present();
                });
            }
            else {
                return false;
            }
        });
    }
    /**
     * Download the favourited gifs into the device
     *
     * @param url string
     * @param file name string
     * @param extension string
     */
    StorageService.prototype.onFavouriteGif = function (url, fileName, extension) {
        var _this = this;
        this.platform.ready()
            .then(function () {
            var fileTransfer = _this.transfer.create();
            fileTransfer.download(url, _this.storageDirectory + fileName + '.' + extension)
                .then(function (entry) {
                var alertSuccess = _this.alertCtrl.create({
                    title: 'Gif saved in your device',
                    subTitle: "successfully downloaded to: " + entry.toURL(),
                    buttons: ['Ok']
                });
                alertSuccess.present();
                _this.onListFavourites();
            }, function (error) {
                var alertFailure = _this.alertCtrl.create({
                    title: 'Download Failed!',
                    buttons: ['Ok']
                });
                alertFailure.present();
            });
        }, function (error) {
            var alertFailure = _this.alertCtrl.create({
                title: 'Server error',
                buttons: ['Ok']
            });
            alertFailure.present();
        });
    };
    /**
     * Unfavourite a gif (delete the file)
     *
     * @param file name string
     */
    StorageService.prototype.onUnfavouriteGif = function (fileName, extension) {
        var _this = this;
        this.platform.ready()
            .then(function () {
            if (_this.isFileSaved(fileName, extension)) {
                _this.file.removeFile(_this.storageDirectory, fileName + '.' + extension)
                    .then(function () {
                    console.log('File deleted');
                }, function (error) {
                    var alertFailure = _this.alertCtrl.create({
                        title: 'Server error',
                        buttons: ['Ok']
                    });
                    alertFailure.present();
                });
            }
            else {
                console.log('File does not exist in the system.');
            }
        }, function (error) {
            var alertFailure = _this.alertCtrl.create({
                title: 'Server error',
                buttons: ['Ok']
            });
            alertFailure.present();
        });
    };
    /**
     * Checks if the file exists internally
     *
     * @param file name string
     * @param extension string
     * @return Promise boolean
     */
    StorageService.prototype.isFileSaved = function (fileName, extension) {
        var _this = this;
        return this.platform.ready()
            .then(function () {
            return _this.file.checkFile(_this.storageDirectory, fileName + '.' + extension)
                .then(function (result) {
                if (result) {
                    return true;
                }
            }, function (error) {
                return false;
            });
        }, function (error) {
            return false;
        });
    };
    /**
     * List the image files in the local drive
     */
    StorageService.prototype.onListFavourites = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.file.listDir(_this.storageDirectory, '')
                .then(function (entries) { return entries
                .filter(function (value) {
                _this.imgLocalUrl.push(_this.storageDirectory + value.name);
            }, function (error) {
                var alertFailure = _this.alertCtrl.create({
                    title: 'Nothing to show.',
                    buttons: ['Ok']
                });
                alertFailure.present();
            }); });
        }, function (error) {
            var alertFailure = _this.alertCtrl.create({
                title: 'Server error',
                buttons: ['Ok']
            });
            alertFailure.present();
        });
    };
    /**
     * Get the array of paths of the files saved.
     *
     * @return array
     */
    StorageService.prototype.getImgLocalUrl = function () {
        return this.imgLocalUrl;
    };
    StorageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
        /**
        * Service responsible for the interations between the user and the device's file system
        */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
    ], StorageService);
    return StorageService;
}());

//# sourceMappingURL=storage.service.js.map

/***/ }),

/***/ 117:
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
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 158:
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
webpackEmptyAsyncContext.id = 158;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favourites_favourites__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__favourites_favourites__["a" /* FavouritesPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/elvis/hun/freshworks/gifGallery/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Feed" tabIcon="logo-rss"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Favourites" tabIcon="heart"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/elvis/hun/freshworks/gifGallery/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavouritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_storage_service__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FavouritesPage = /** @class */ (function () {
    /**
      * Constructor
      *
      * @param navctrl NavController
      * @param storageService StorageService
      * @param toast ToastController
      */
    function FavouritesPage(navCtrl, storageService, toast) {
        this.navCtrl = navCtrl;
        this.storageService = storageService;
        this.toast = toast;
    }
    /**
     * Cache management
     */
    FavouritesPage.prototype.ionViewWillLoad = function () {
        this.storageService.onListFavourites();
    };
    /**
     * Angular native method
     */
    FavouritesPage.prototype.ngOnInit = function () {
        this.items = this.storageService.getImgLocalUrl();
    };
    /**
     * Error handling that triggers a toast warning
     *
     * @param error (any)
     */
    FavouritesPage.prototype.onError = function (error) {
        this.toastOptions = {
            message: error.msg,
            duration: 5000
        };
        this.toast.create(this.toastOptions).present();
    };
    FavouritesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-favourites',template:/*ion-inline-start:"/home/elvis/hun/freshworks/gifGallery/src/pages/favourites/favourites.html"*/'<ion-content padding class="my-page">\n    <ion-grid class="verticalPad">\n       <ion-row *ngIf="items">\n            <ion-col col-6 *ngFor="let item of items">\n                <img src="{{ item }}"><br />\n                    <ion-icon name="heart-outline" item-start></ion-icon>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/elvis/hun/freshworks/gifGallery/src/pages/favourites/favourites.html"*/
        })
        /**
        * Component responsible for the 2nd tab of the app
        */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__app_services_storage_service__["a" /* StorageService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ToastController */]])
    ], FavouritesPage);
    return FavouritesPage;
}());

//# sourceMappingURL=favourites.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_storage_service__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param navctrl NavController
     * @param apiService ApiService
     * @param storageService StorageService
     * @param toast ToastController
     */
    function HomePage(navCtrl, apiService, storageService, toast, renderer) {
        this.navCtrl = navCtrl;
        this.apiService = apiService;
        this.storageService = storageService;
        this.toast = toast;
        this.renderer = renderer;
    }
    /**
     * Angular native method
     */
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getEndpointResponse('trending')
            .subscribe(function (response) { return _this.trends = response.data; }, function (error) { return _this.onError(error); });
    };
    /**
     * Hit the API's endpoint for searching gifs
     *
     * @param event Ionic native parameter
     */
    HomePage.prototype.onSearch = function (event) {
        var _this = this;
        this.apiService.getEndpointResponse('search', event)
            .subscribe(function (response) { return _this.items = (response.data.length > 0) ? response.data : null; }, function (error) { return _this.onError(error); });
        // workaround to dealing with keyboard Android issue
        var activeElement = document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
    };
    /**
     * Checks if the file exists internally
     *
     * @param file name string
     * @param extension string
     * @return Promise boolean
     */
    HomePage.prototype.isFileSaved = function (fileName, extension) {
        return this.storageService.isFileSaved(fileName, extension)
            .then(function (result) {
            if (result) {
                return true;
            }
        }, function (error) {
            return false;
        });
    };
    /**
     * Favourite a gif (save the file internally)
     *
     * @param url string
     * @param file name string
     * @param extension string
     */
    HomePage.prototype.onFavouriteGif = function (url, fileName, extension) {
        this.storageService.onFavouriteGif(url, fileName, extension);
    };
    /**
     * Unfavourite a gif (delete the file)
     *
     * @param file name string
     * @param extension string
     */
    HomePage.prototype.onUnfavouriteGif = function (fileName, extension) {
        this.storageService.onUnfavouriteGif(fileName, extension);
    };
    /**
     * Error handling that triggers a toast warning
     *
     * @param error (any)
     */
    HomePage.prototype.onError = function (error) {
        this.toastOptions = {
            message: error.msg,
            duration: 5000
        };
        this.toast.create(this.toastOptions).present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/elvis/hun/freshworks/gifGallery/src/pages/home/home.html"*/'<ion-content padding class="my-page">\n\n    <ion-searchbar #mySearchbar\n        animated="true"\n        placeholder="Search gifs"\n        [(ngModel)]="myInput"\n        [showCancelButton]="shouldShowCancel"\n        (ionInput)="onSearch($event)"\n        (ionClear)="onClear()">\n    </ion-searchbar>\n    \n    <ion-list *ngIf="!items">\n        <ion-item *ngFor="let trend of trends" no-lines class="my-page">\n            <img src="{{trend.images.fixed_width_downsampled.url}}" item-start>\n            <ion-icon name="heart-outline" (tap)="onFavouriteGif(trend.images.original.url, trend.slug,trend.type)" *ngIf="!isFileSaved(trend.slug,trend.type)" item-end></ion-icon>\n            <ion-icon name="heart" (tap)="onUnfavouriteGif(trend.slug,trend.type)" *ngIf="isFileSaved(trend.slug,trend.type)" item-end></ion-icon>\n        </ion-item>\n    </ion-list>\n\n    <ion-list *ngIf="items">\n        <ion-item *ngFor="let item of items" no-lines>\n            <img src="{{item.images.fixed_width_downsampled.url}}" item-start>\n            <ion-icon name="heart-outline" (tap)="onFavouriteGif(item.images.original.url, item.slug,item.type)" *ngIf="!isFileSaved(item.slug,item.type)" item-end></ion-icon>\n            <ion-icon name="heart" (tap)="onUnfavouriteGif(item.slug,item.type)" *ngIf="isFileSaved(item.slug,item.type)" item-end></ion-icon>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/home/elvis/hun/freshworks/gifGallery/src/pages/home/home.html"*/,
        })
        /**
        * Component responsible for the 1st tab of the app
        */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_3__app_services_storage_service__["a" /* StorageService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ToastController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_Constants__ = __webpack_require__(294);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ApiService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param http Http
     */
    function ApiService(http) {
        this.apiKey = __WEBPACK_IMPORTED_MODULE_5__constants_Constants__["a" /* Constants */].API_KEY;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_5__constants_Constants__["a" /* Constants */].API_URL;
        this.http = http;
    }
    /**
     * Polymorphic function that hit different endpoints
     *
     * @param endpoint string
     * @param query string. Null when the endpoint doesn't need this second parameter
     * @return JSON object
     */
    ApiService.prototype.getEndpointResponse = function (endpoint, query) {
        if (query === void 0) { query = null; }
        var endpointPath = {
            "search": {
                "apiKeyPrefix": __WEBPACK_IMPORTED_MODULE_5__constants_Constants__["a" /* Constants */].API_SEARCH_PREFIX,
                "maxRegisters": __WEBPACK_IMPORTED_MODULE_5__constants_Constants__["a" /* Constants */].API_MAX_REGISTERS,
                "path": __WEBPACK_IMPORTED_MODULE_5__constants_Constants__["a" /* Constants */].GET_SEARCH_ENDPOINT,
                "searchPrefix": __WEBPACK_IMPORTED_MODULE_5__constants_Constants__["a" /* Constants */].GET_SEARCH_PREFIX
            },
            "trending": {
                "apiKeyPrefix": __WEBPACK_IMPORTED_MODULE_5__constants_Constants__["a" /* Constants */].API_TRENDING_PREFIX,
                "maxRegisters": __WEBPACK_IMPORTED_MODULE_5__constants_Constants__["a" /* Constants */].API_MAX_REGISTERS,
                "path": __WEBPACK_IMPORTED_MODULE_5__constants_Constants__["a" /* Constants */].GET_TRENDING_ENDPOINT
            }
        };
        endpoint = endpointPath[endpoint];
        var querySearch = (query) ? endpoint.searchPrefix + query.target.value.replace(/\s+/g, '-') : '';
        return this.http.get(this.baseUrl + endpoint.path + querySearch + endpoint.apiKeyPrefix + this.apiKey)
            .map(function (res) { return res.json(); })
            .catch(this.errorHandler);
    };
    /**
     * Error handling
     *
     * @param error (any)
     */
    ApiService.prototype.errorHandler = function (error) {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.message || 'Server error!');
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
        /**
        * Service responsible for the interations with the Giphy API
        */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ApiService);
    return ApiService;
}());

//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(231);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_favourites_favourites__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_opener__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_keyboard__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_image_loader__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_api_service__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_storage_service__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_favourites_favourites__["a" /* FavouritesPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_15_ionic_image_loader__["b" /* IonicImageLoader */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_favourites_favourites__["a" /* FavouritesPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_opener__["a" /* FileOpener */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_16__services_api_service__["a" /* ApiService */],
                __WEBPACK_IMPORTED_MODULE_17__services_storage_service__["a" /* StorageService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_image_loader__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, imageLoaderConfig) {
        var _this = this;
        this.imageLoaderConfig = imageLoaderConfig;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            _this.imageLoaderConfig.enableDebugMode();
            _this.imageLoaderConfig.enableSpinner(true);
            _this.imageLoaderConfig.setMaximumCacheAge(2 * 60 * 60 * 1000);
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/elvis/hun/freshworks/gifGallery/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/elvis/hun/freshworks/gifGallery/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4_ionic_image_loader__["a" /* ImageLoaderConfig */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
/**
* Class responsible for the Giphy API URL, endpoints and keys
*/
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "API_KEY", {
        get: function () {
            return 'QrOqc4rBxBHkypdODTxv3mY4iY5jLAWS';
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "API_MAX_REGISTERS", {
        get: function () {
            return '?limit=300';
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "API_SEARCH_PREFIX", {
        get: function () {
            return '&api_key=';
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "API_TRENDING_PREFIX", {
        get: function () {
            return '?api_key=';
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "API_URL", {
        get: function () {
            return 'http://api.giphy.com/v1';
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "GET_SEARCH_ENDPOINT", {
        get: function () {
            return '/gifs/search';
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "GET_SEARCH_PREFIX", {
        get: function () {
            return '?q=';
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "GET_TRENDING_ENDPOINT", {
        get: function () {
            return '/gifs/trending';
        },
        enumerable: true,
        configurable: true
    });
    ;
    return Constants;
}());

//# sourceMappingURL=Constants.js.map

/***/ })

},[210]);
//# sourceMappingURL=main.js.map