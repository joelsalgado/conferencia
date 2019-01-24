import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  clave : '';
  todo: any;
  name: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todoService: TodosProvider,) {
    this.clave = navParams.get('clave');
    console.log(this.clave);
    this.actualizar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  updateTodo(todo){
    todo.status=1;
    console.log(todo);
    this.todoService.updateTodo(todo);
    this.actualizar();

  }
  actualizar(){
    this.todoService.findUser(this.clave).then((data) => {
      this.todo = data;
      this.name = data[0].nombre;
      console.log(data);
    });
  }

}
