import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { usuarios } from '../../app/users';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '', photoURL: '', displayName: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams,     private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,private auth: AuthServiceProvider,
    private actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public login() {
    this.showLoading()
    // if(this.registerCredentials.email === 'test@test.com'){
    //   this.registerCredentials.displayName = 'Lucas Bonanni';
    //   this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=6'
    // }
    this.auth.signInWithEmail(this.registerCredentials).then(allowed => {
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      alert(error);
      this.loading.dismiss();
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Se produjo un error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  loginWithGithub() {
    this.auth.signInWithGithub().then(() => {
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      alert(error);
    });;
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle().then(() => {
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      alert(error);
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar un usuario',
      buttons: [
        {
          text: usuarios[0].perfil + ' ' + usuarios[0].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[0].nombre;
            this.registerCredentials.password = usuarios[0].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[0].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=1'
            this.login();
          }
        }, {
          text: usuarios[1].perfil + ' ' + usuarios[1].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[1].nombre;
            this.registerCredentials.password = usuarios[1].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[1].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2'
            this.login();
          }
        }, {
          text: usuarios[2].perfil + ' ' + usuarios[2].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[2].nombre;
            this.registerCredentials.password = usuarios[2].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[2].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=3'
            this.login();
            
          }
        },
        {
          text: usuarios[3].perfil + ' ' + usuarios[3].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[3].nombre;
            this.registerCredentials.password = usuarios[3].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[3].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=4'
            this.login();
          }
        },
        {
          text: usuarios[4].perfil + ' ' + usuarios[4].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[4].nombre;
            this.registerCredentials.password = usuarios[4].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[4].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=5'
            this.login();
          }
        }
      ]
    });
    actionSheet.present();
  }

}
