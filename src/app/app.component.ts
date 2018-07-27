import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImageLoaderConfig } from 'ionic-image-loader';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
    templateUrl: 'app.html'
})
export class MyApp 
{
    rootPage:any = TabsPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private imageLoaderConfig: ImageLoaderConfig)
    {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            this.imageLoaderConfig.enableDebugMode();
            this.imageLoaderConfig.enableSpinner(true);
            this.imageLoaderConfig.setMaximumCacheAge(2*60*60*1000);
        });
    }
}
