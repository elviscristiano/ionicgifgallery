import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Renderer } from '@angular/core';
import { ToastController, ToastOptions } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { StorageService } from '../../app/services/storage.service';
import { IonicImageLoader } from 'ionic-image-loader';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html',
})

/**
* Component responsible for the 1st tab of the app
*/
export class HomePage 
{
    private items: any;
    private trends: any;
    private toastOptions: ToastOptions;

    /**
     * Constructor 
     * 
     * @param navctrl NavController 
     * @param apiService ApiService
     * @param storageService StorageService
     * @param toast ToastController
     */
    constructor(public navCtrl: NavController, private apiService: ApiService, private storageService: StorageService, private toast: ToastController, private renderer: Renderer)
    {}

    /**
     * Angular native method 
     */
    ngOnInit()
    {
        this.apiService.getEndpointResponse('trending')
            .subscribe(response => this.trends = response.data,
                       error => this.onError(error));
    }

    /**
     * Hit the API's endpoint for searching gifs
     *
     * @param event Ionic native parameter
     */
    onSearch(event)
    {
        this.apiService.getEndpointResponse('search', event)
            .subscribe(response => this.items = (response.data.length > 0) ? response.data : null,
                       error => this.onError(error));

        // workaround to dealing with keyboard Android issue
        let activeElement = <HTMLElement>document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
    }
    
    /**
     * Checks if the file exists internally
     * 
     * @param file name string
     * @param extension string
     * @return Promise boolean
     */
    isFileSaved(fileName: string, extension: string)
    {
        return this.storageService.isFileSaved(fileName, extension)
        .then((result) => {
            return result;
        },
        (error) => {
            this.onError(error);
        })
    }

    /**
     * Favourite a gif (save the file internally) 
     * 
     * @param url string
     * @param file name string
     * @param extension string
     */
    onFavouriteGif(url: string, fileName: string, extension: string)
    {
        this.storageService.onFavouriteGif(url, fileName, extension);
    }

    /**
     * Unfavourite a gif (delete the file)
     * 
     * @param file name string
     * @param extension string
     */
    onUnfavouriteGif(fileName: string, extension: string)
    {
        this.storageService.onUnfavouriteGif(fileName, extension);
    }

    /**
     * Error handling that triggers a toast warning
     *
     * @param error (any)
     */
    onError(error: any)
    {
        this.toastOptions = {
            message: error.msg,
            duration: 5000
        };
        this.toast.create(this.toastOptions).present();
    }

}
