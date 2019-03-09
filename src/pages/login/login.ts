import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ToastOptions} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodosProvider} from "../../providers/todos/todos";
import {ConferenciasPage} from "../conferencias/conferencias";
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

  myForm: FormGroup;
  username: '';
  password: '';
  toastOpcion: ToastOptions;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public todoService: TodosProvider,
              private toast: ToastController) {

    if (localStorage.getItem("userid") === null) {
      console.log('No');
    }else{
      this.navCtrl.setRoot(ConferenciasPage);
    }

    this.myForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  changeView(){
    this.username  = this.myForm.value.username;
    this.password  = this.myForm.value.password;

    this.todoService.loginUser(this.username,this.password).then((data) => {
      if(data != 0){
        console.log(data);
        localStorage.setItem('userid', data[0].id);
        localStorage.setItem('username', data[0].username);
        this.navCtrl.setRoot(ConferenciasPage);
      }else{
        this.toastOpcion = {
          message: 'Usuario o contraseña incorrecta',
          duration: 3000
        };

        this.toast.create(this.toastOpcion).present();

      }
    });


  }

}
