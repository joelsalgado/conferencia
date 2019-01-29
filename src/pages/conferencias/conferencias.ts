import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ToastOptions} from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";
import {HomePage} from "../home/home";
import moment from 'moment';

/**
 * Generated class for the ConferenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conferencias',
  templateUrl: 'conferencias.html',
})
export class ConferenciasPage {

  user:'';
  userid:'';
  conferencias:any;
  myDate: String;
  myDate2: String;
  toastOpcion: ToastOptions;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todoService: TodosProvider,
              private toast: ToastController) {

    this.user = navParams.get('username');
    this.userid = navParams.get('userid');

    this.myDate = new Date().toLocaleString('en-ZA', { timeZone: 'America/Mexico_City'}).substring(0, 10);
    this.myDate2 = this.hora();

    this.todo();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferenciasPage');
  }

  todo(){
    this.todoService.getConferencias().then((data) => {
      //console.log(data);
      this.conferencias = data;

    });
  }

  changeView(conferencia){
    this.todo();
    console.log(this.antes(conferencia.inicio));
    console.log(this.despues(conferencia.inicio));
    if(this.antes(conferencia.inicio) <= 159  && this.despues(conferencia.inicio) <= 159){
      this.navCtrl.push(HomePage, {
        username:this.user,
        userid: this.userid,
        conferencia : conferencia,
        conferenciaid: conferencia.id,
        inicio: conferencia.inicio
      });
    }else{
      this.toastOpcion = {
        message: 'Antes de 15 minutos',
        duration: 3000
      };

      this.toast.create(this.toastOpcion).present();
    }


  }

  antes(value){
    let x = this.hora()+'';
    let diff = moment(value, 'HH:mm').diff(moment(x, 'HH:mm'))
    let d = moment.duration(diff);
    return(Number(Math.floor(d.asHours()) + moment.utc(diff).format("mm")));
  }


  despues(value){
    let x = this.hora()+'';
    let diff = moment(x, 'HH:mm').diff(moment(value, 'HH:mm'))
    let d = moment.duration(diff);
    //console.log(Number(Math.floor(d.asHours()) + moment.utc(diff).format("mm")));
    return(Number(Math.floor(d.asHours()) + moment.utc(diff).format("mm")));
  }

  hora(){
    return new Date().toLocaleString('en-ZA', { timeZone: 'America/Mexico_City'}).substring(12, 17);
  }

}
