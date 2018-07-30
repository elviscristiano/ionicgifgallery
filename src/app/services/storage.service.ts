import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/catch';

declare const cordova: any;

@Injectable()

/**
* Service responsible for the interations between the user and the device's file system
*/
export class StorageService
{
	private storageDirectory: string;
	private imgLocalUrl: Array<any>;

	/**
	 * Constructor - check if the storage directory exists. If not, the constructor creates it.
	 * 
	 * @param platform Platform 
	 * @param transfer FileTransfer
	 * @param file File
	 * @param alertctl AlertController
	 */
	constructor(private platform: Platform, private transfer: FileTransfer, private file: File, public alertCtrl: AlertController) 
	{
		this.platform.ready()
		.then(() => {
	  		// make sure this is on a device
	  		if (!this.platform.is('cordova')) {
	    		return false;
	  		}
		  	// ios and android storage directories
		  	if (this.platform.is('ios')) {
		    	this.storageDirectory = cordova.file.documentsDirectory;
		  	}
		  	else if(this.platform.is('android')) {
		    	this.storageDirectory = cordova.file.externalDataDirectory;
		  		file.checkDir(this.storageDirectory,'')
		  		.then((exists) => {
					this.onListFavourites();
	  			},
			    (notExists) => {
	    			file.createDir(this.storageDirectory,'', true)
	    			.then((result) => {
	    				console.log('Directory created.');
	   				},
	   				(error) => {
						const alertFailure = this.alertCtrl.create({
		          			title: 'Server error: directory not created!',
		          			buttons: ['Ok']
		        		});
		        		alertFailure.present();
	   				});			    
	    		});
		  	}
		  	else {
		    	return false;
		  	}
		},
	    (error) => {
	        const alertFailure = this.alertCtrl.create({
	          	title: 'Device is not available.',
	          	buttons: ['Ok']
	        });
	        alertFailure.present();
	    });
	}

	/**
	 * Download the favourited gifs into the device
	 * 
	 * @param url string
	 * @param file name string
	 * @param extension string
	 */
	onFavouriteGif(url: string, fileName: string, extension: string)
	{
	    this.platform.ready()
	    .then(() => {
			const fileTransfer: FileTransferObject = this.transfer.create();
			fileTransfer.download(url, this.storageDirectory + fileName + '.' + extension)
			.then((entry) => {
	       		const alertSuccess = this.alertCtrl.create({
		    		title: 'Gif saved in your device',
		    		    subTitle: `successfully downloaded to: ${entry.toURL()}`,
		    		buttons: ['Ok']
		    	});
			    alertSuccess.present();
			    this.onListFavourites();
		    },
		    (error) => {
		        const alertFailure = this.alertCtrl.create({
		          	title: 'Download Failed!',
		          	buttons: ['Ok']
		        });
		        alertFailure.present();
		    });
		},
	    (error) => {
	        const alertFailure = this.alertCtrl.create({
	          	title: 'Server error',
	          	buttons: ['Ok']
	        });
	        alertFailure.present();
	    });
	}

	/**
	 * Unfavourite a gif (delete the file)
	 * 
	 * @param file name string
	 */
	onUnfavouriteGif(fileName: string, extension: string)
	{
	    this.platform.ready()
	    .then(() => {
	    	if(this.isFileSaved(fileName, extension))
	    	{
	    		this.file.removeFile(this.storageDirectory, fileName + '.' + extension)
	    		.then(() => {
	    			this.onListFavourites;
	    			console.log('File deleted');
	    		},
			    (error) => {
			        const alertFailure = this.alertCtrl.create({
			          	title: 'Server error',
			          	buttons: ['Ok']
			        });
			        alertFailure.present();
			    });
	    	} else {
	    		console.log('File does not exist in the system.')
	    	}
		},
	    (error) => {
	        const alertFailure = this.alertCtrl.create({
	          	title: 'Server error',
	          	buttons: ['Ok']
	        });
	        alertFailure.present();
	    });
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
	    return this.platform.ready()
	    .then(() => {
			return this.file.checkFile(this.storageDirectory,fileName + '.' + extension)
	  		.then((found) => {
    			return true;
	    	},
		    (notFound) => {
		        return false;
		    })
		},
	    (error) => {
	        const alertFailure = this.alertCtrl.create({
	          	title: 'Server error',
	          	buttons: ['Ok']
	        });
	        alertFailure.present();
	    });
	}

	/**
	 * List the image files in the local drive 
	 */
	onListFavourites()
	{
	    this.platform.ready()
    	.then(() => {
			this.file.listDir(this.storageDirectory,'')
	 		.then(entries => entries
	 			.filter(value => {
					this.imgLocalUrl.push(this.storageDirectory + value.name);		 				
				},
		    	(error) => {
		        	const alertFailure = this.alertCtrl.create({
		          		title: 'Nothing to show.',
		          		buttons: ['Ok']
		        	});
		        	alertFailure.present();
		    	}))
		 	},
		    (error) => {
		        const alertFailure = this.alertCtrl.create({
		          	title: 'Server error',
		          	buttons: ['Ok']
		        });
		        alertFailure.present();
		    })
	}

	/**
	 * Get the array of paths of the files saved.
	 * 
	 * @return array
	 */
	getImgLocalUrl()
	{
		console.log(this.imgLocalUrl);
		return this.imgLocalUrl; 
	}
}
