import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, ToastOptions } from 'ionic-angular';
import { StorageService } from '../../app/services/storage.service';

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html'
})

/**
* Component responsible for the 2nd tab of the app
*/
export class FavouritesPage 
{
	private items: any;
    private imgLocalUrl: Array<any>;
    private toastOptions: ToastOptions;

   /**
     * Constructor 
     * 
     * @param navctrl NavController 
     * @param storageService StorageService
     * @param toast ToastController
     */
   	constructor(public navCtrl: NavController, private storageService: StorageService, private toast: ToastController)
  	{}

	/**
	 * Cache management 
	 */
	ionViewWillLoad()
	{
    	this.storageService.onListFavourites();
    }

	/**
	 * Angular native method 
	 */
  	ngOnInit()
  	{
  		this.items = this.storageService.getImgLocalUrl();
  	}

    /**
     * Unfavourite a gif (delete the file)
     * 
     * @param file name string
     */
    onUnfavouriteGif(fileName)
    {
		let extension = fileName.substr(fileName.lastIndexOf('.') + 1);
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
