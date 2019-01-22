import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListPage} from "../list/list";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  todo: any;
  myForm: FormGroup;
  Clave: '';

  constructor(public navCtrl: NavController,
              public todoService: TodosProvider,
              public alertCtrl: AlertController,
              private barcodeScanner: BarcodeScanner,
              public fb: FormBuilder,) {



    this.myForm = this.fb.group({
      Clave: ['', [Validators.required]],
    });


  }
  ionViewDidLoad(){

    this.todoService.getTodos().then((data) => {
      this.todos = data;
      console.log(data);
    });

  }

  changeView(){
    this.Clave = this.myForm.value.Clave;
    console.log(this.Clave);
    this.navCtrl.setRoot(ListPage, {clave: this.Clave })
  }

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {

        console.log(barcodeData.text);
      this.navCtrl.setRoot(ListPage, {clave: barcodeData.text })
    });


  }

}
