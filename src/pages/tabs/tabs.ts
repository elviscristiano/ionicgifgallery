import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FavouritesPage } from '../favourites/favourites';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage 
{
  tab1Root = HomePage;
  tab2Root = FavouritesPage;

  constructor(public navCtrl: NavController){}
}
