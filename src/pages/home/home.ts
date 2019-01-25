import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController, ToastOptions} from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListPage} from "../list/list";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {ConferenciasPage} from "../conferencias/conferencias";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  todo: any;
  myForm: FormGroup;
  Clave: '';
  username: '';
  userid: '';
  conferencia = '';
  toastOpcion: ToastOptions;

  constructor(public navCtrl: NavController,
              public todoService: TodosProvider,
              public alertCtrl: AlertController,
              private barcodeScanner: BarcodeScanner,
              public fb: FormBuilder,
              public navParams: NavParams,
              private toast: ToastController) {

    this.username = navParams.get('username');
    this.userid = navParams.get('userid');
    this.conferencia = navParams.get('conferencia');



    this.myForm = this.fb.group({
      Clave: ['', [Validators.required]],
    });


  }
  ionViewDidLoad(){

    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });

  }

  changeView(){
    this.Clave = this.myForm.value.Clave;
    let hehe = 0;
    hehe = this.conferencia.id;
    this.todoService.findUser2(this.Clave, hehe).then((data) => {
      if(data != 0){
        this.myForm.reset();
        console.log(data);
      }else{
        this.toastOpcion = {
          message: 'No coincide la conferencia con el asistente',
          duration: 3000
        };

        this.toast.create(this.toastOpcion).present();

      }
    });
    //this.navCtrl.push(ListPage, {clave: this.Clave })
  }

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {

        console.log(barcodeData.text);
      this.navCtrl.push(ListPage, {clave: barcodeData.text })
    });


  }

}
