import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController, ToastOptions} from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  username: '';
  userid: '';
  conferencia = '';
  conferenciaid = 0;
  toastOpcion: ToastOptions;

  constructor(public navCtrl: NavController,
              public todoService: TodosProvider,
              public alertCtrl: AlertController,
              private barcodeScanner: BarcodeScanner,
              public fb: FormBuilder,
              public navParams: NavParams,
              private toast: ToastController,
              public alertController: AlertController) {

    this.username = navParams.get('username');
    this.userid = navParams.get('userid');
    this.conferencia = navParams.get('conferencia');
    this.conferenciaid = navParams.get('conferenciaid');


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

    this.alerts(this.Clave);
  }

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData.text);
      this.alerts(barcodeData.text);
    });

  }

  alerts(user_id){
    this.todoService.findUser2(user_id, this.conferenciaid).then((data) => {
      if(data != 0){
        this.myForm.reset();
        console.log(data[0].status);
        if(data[0].status == 0){
          const alert = this.alertController.create({
            title: 'CONFIRMAR ASISTENCIA',
            message:'ASISTENTE: '+data[0].nombre,
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Ok',
                handler: () => {
                  data[0].status = 1;
                  this.todoService.updateTodo(data[0]);
                  console.log('Confirm Okay');
                }
              }
            ]
          });

          alert.present();


        }
        else{
          let alert = this.alertCtrl.create({
            title: 'ASISTENTE REGISTRADO',
            subTitle: 'Este asistente ya se registro en esta confencia',
            buttons: ['Ok']
          });
          alert.present();

        }
      }else{
        this.toastOpcion = {
          message: 'No coincide la conferencia con el asistente',
          duration: 3000
        };

        this.toast.create(this.toastOpcion).present();

      }
    });

  }

}
