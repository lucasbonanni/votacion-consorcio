import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { VoteProvider } from '../../providers/vote/vote';
import { User } from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  user: User;
  @ViewChild('slides') slidesRef: Slides;
  voto: boolean = false;
  result: any;

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, private vote: VoteProvider) {
    this.result = {};
  }

  ngOnInit(): void {
    this.user = this.auth.getUserInfo();
    this.vote.votes.subscribe(
      next => { 
        console.log(next);
        if(next.filter( value => value.displayName === this.user.displayName).length > 0){
          this.slidesRef.slideTo(2);
          this.voto = true;
          this.slidesRef.lockSwipes(true);
        };
      },
      error => console.log(error),
      () => {

      });
    this.slidesRef.enableKeyboardControl(true);
    this.result = this.vote.getResults();
  }


  slideChanged() {
    let currentIndex = this.slidesRef.getActiveIndex();
    console.log('current slide', currentIndex);
    if (currentIndex === 1 && !this.voto) {
      this.slidesRef.lockSwipes(true);
      this.slidesRef.lockSwipeToNext
    }
    if (!this.voto && currentIndex === 2) {
      this.slidesRef.slidePrev();
    }
    if(this.vote && currentIndex ===3)
    {
      this.result = this.vote.getResults();
      console.log(this.result);
    }
  }


  public votePlantas() {
    this.vote.votePlantas(this.user.displayName);
    this.mensage();
  }

  public voteMatafuetos() {
    this.vote.voteMatefuegos(this.user.displayName);
    this.mensage();
  }
  mensage() {
    // console.log('prueba botón');
    this.slidesRef.lockSwipes(false);
    this.slidesRef.slideNext();
    this.slidesRef.lockSwipes(true);
    
  }

  public logout() {
    this.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

}
