import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todoService: TodosProvider,
              private toast: ToastController) {

    this.user = navParams.get('username');
    this.userid = navParams.get('userid');

    this.myDate = new Date().toLocaleString('en-ZA', { timeZone: 'America/Mexico_City'}).substring(0, 10);
    this.myDate2 = new Date().toLocaleString('en-ZA', { timeZone: 'America/Mexico_City'});

    this.todoService.getConferencias().then((data) => {
      console.log(data);
      this.conferencias = data;

    });


    let diff = moment('11:10', 'HH:mm').diff(moment('10:50', 'HH:mm'))
    let d = moment.duration(diff);
    console.log(Math.floor(d.asHours()) + moment.utc(diff).format("mm"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferenciasPage');
  }

  changeView(conferencia){
    this.navCtrl.push(HomePage, {
      username:this.user,
      userid: this.userid,
      conferencia : conferencia,
      conferenciaid: conferencia.id
    });
  }

  antes(){
    let diff = moment('11:10', 'HH:mm').diff(moment('10:50', 'HH:mm'))
    let d = moment.duration(diff);
    return(Math.floor(d.asHours()) + moment.utc(diff).format("mm"));
  }

}
