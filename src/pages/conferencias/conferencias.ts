import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";
import {HomePage} from "../home/home";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todoService: TodosProvider,
              private toast: ToastController) {

    this.user = navParams.get('username');
    this.userid = navParams.get('userid');

    this.myDate = new Date().toISOString();

    this.todoService.getConferencias().then((data) => {
      console.log(data);
      this.conferencias = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferenciasPage');
  }

  changeView(conferencia){
    this.navCtrl.push(HomePage, {username:this.user, userid: this.userid, conferencia : conferencia });
  }

}
