import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  @ViewChild('slides') slidesRef: Slides;
  voto: boolean = false;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    // this.slidesRef.lockSwipes(this.voto);
    this.slidesRef.enableKeyboardControl(true);
  }

  //   slides = [
  //     {
  //       title: "Bienvenido!!",
  //       description: "Bievenido a la aplicación de votación de consorcio.",
  //       image: "assets/img/ica-slidebox-img-1.png",
  //     },
  //     {
  //       title: "What is Ionic?",
  //       description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
  //       image: "assets/img/ica-slidebox-img-2.png",
  //     },
  //     {
  //       title: "What is Ionic Cloud?",
  //       description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
  //       image: "assets/img/ica-slidebox-img-3.png",
  //     }
  // ];.

  slideChanged() {
    let currentIndex = this.slidesRef.getActiveIndex();
    console.log('current slide', currentIndex);
    if(currentIndex === 1 && !this.voto){
      this.slidesRef.lockSwipes(true);
      this.slidesRef.lockSwipeToNext
    }
    if(!this.voto && currentIndex === 2){
      this.slidesRef.slidePrev();
    }
  }

  mensage() {
    console.log('prueba botón');
    this.slidesRef.lockSwipes(false);
    this.slidesRef.slideNext();
    this.slidesRef.lockSwipes(true);
  }

}
