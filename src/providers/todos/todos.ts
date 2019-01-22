import { Injectable } from '@angular/core';
import PouchDB  from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodosProvider {

  data: any;
  db: any;
  remote: any;

  constructor() {
    console.log('Hello TodosProvider Provider');

    this.db = new PouchDB('example');
    PouchDB.plugin(PouchDBFind);

    this.remote = 'http://192.168.2.5:5984/example2';

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);
  }

  getTodos() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch((error) => {

        console.log(error);

      });

    });

  }

  findUser(userid) {
    return new Promise((resolve, reject)=>{
      this.db.find({
        selector: {
          clave: userid,
          status: 0
        }
      }).then((res) => {
        resolve(res.docs);
      }).catch((err) => {
        reject(err);
      })
    })
  }



  updateTodo(todo){
    this.db.put(todo).catch((err) => {
      console.log(err);
    });
  }

  deleteTodo(todo){

  }

  handleChange(change){
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data.push(change.doc);
      }

    }
  }



}
