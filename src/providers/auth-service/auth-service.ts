import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '@firebase/auth-types';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  user: User;
  access: boolean;
  constructor(public afAuth: AngularFireAuth,private toastCtrl: ToastController) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password).then(()=>{
        console.log(credentials);
        this.user = this.afAuth.auth.currentUser;
        if(credentials.displayName && credentials.photoURL && credentials.displayName !== '' && credentials.photoURL !== ''){
          this.user.updateProfile({displayName:credentials.displayName,photoURL:credentials.photoURL});
        }
      });
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(() => {
      return this.afAuth.auth.getRedirectResult().then(result => {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        // let token = result.credential.accessToken;
        // The signed-in user info.
        this.user = this.afAuth.auth.currentUser;
        this.user.updateProfile({displayName:credentials.displayName,photoURL:credentials.photoURL});
      }).catch(function (error) {
        // Handle Errors here.
        this.showMessage(error.message);
      });
    });
  }

  setProfile(displayName: string, imageURL: string) {
    this.afAuth.auth.currentUser.updateProfile({ displayName: displayName, photoURL: imageURL })
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  signInWithGoogle() {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  signInWithGithub() {
    console.log('Sign in with github');
    return this.oauthSignIn(new firebase.auth.GithubAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afAuth.auth.getRedirectResult().then(result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
          }).catch(function (error) {
            // Handle Errors here.
            this.showMessage(error.message);
          });
        });
    }
  }

  public getUserInfo(): User {
    return this.afAuth.auth.currentUser;
  }


  
  showMessage(text:string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
}
