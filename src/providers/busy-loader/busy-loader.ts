import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

/*
  Generated class for the BusyLoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BusyLoaderProvider {

  loading: Loading;
  constructor(private loadingCtrl: LoadingController) {

  }


  /**
   * showBusyLoader
   */
  public showBusyLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/Logo-2.png" />',
      showBackdrop: false,
      dismissOnPageChange: true,
      enableBackdropDismiss: true,
      // duration: 4000
    });
    return this.loading.present();
  }

  /**
   * dismissBusyLoader
   */
  public dismissBusyLoader() {
    this.loading.dismiss();
    this.loading = null;
  }

}
