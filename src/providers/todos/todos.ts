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

  data2: any;
  db2: any;
  remote2: any;

  data3: any;
  db3: any;
  remote3: any;

  username = '';
  password = '';

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

    this.db2 = new PouchDB('users');
    this.remote2 = 'http://192.168.2.5:5984/users';
    this.db2.sync(this.remote2, options);

    this.db3 = new PouchDB('conferencias');
    this.remote3 = 'http://192.168.2.5:5984/conferencias';
    this.db3.sync(this.remote3, options);
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

        result.rows.map((row) => {
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

  findUser2(userid, actividad) {
    return new Promise((resolve, reject)=>{
      this.db.find({
        selector: {
          clave: userid,
          activity_id: actividad
        }
      }).then((res) => {
        if(res.docs[0]){
          resolve(res.docs);
        }else{
          resolve(0);
        }
      }).catch((err) => {
        reject(err);
      })
    })
  }

  getUsers() {

    if (this.data2) {
      return Promise.resolve(this.data2);
    }

    return new Promise(resolve => {

      this.db2.allDocs({

        include_docs: true

      }).then((result) => {

        this.data2 = [];

        result.rows.map((row) => {
          this.data2.push(row.doc);
        });

        resolve(this.data2);

        this.db2.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange2(change);
        });
      }).catch((error) => {

        console.log(error);

      });

    });

  }

  loginUser(user, pass) {
    this.username= user;
    this.password = pass;
    return new Promise((resolve, reject)=>{
      this.db2.find({
        selector: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        if(res.docs[0]){
          resolve(res.docs);
        }else{
          resolve(0);
        }

      }).catch((err) => {
        reject(err);
      })
    })
  }

  getConferencias() {

    if (this.data3) {
      return Promise.resolve(this.data3);
    }

    return new Promise(resolve => {

      this.db3.allDocs({

        include_docs: true

      }).then((result) => {

        this.data3 = [];

        result.rows.map((row) => {
          this.data3.push(row.doc);
        });

        resolve(this.data3);

        this.db3.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange3(change);
        });
      }).catch((error) => {

        console.log(error);

      });

    });

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

  handleChange2(change){
    let changedDoc = null;
    let changedIndex = null;

    this.data2.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data2.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if(changedDoc){
        this.data2[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data2.push(change.doc);
      }

    }
  }

  handleChange3(change){
    let changedDoc = null;
    let changedIndex = null;

    this.data3.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data3.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if(changedDoc){
        this.data3[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data3.push(change.doc);
      }

    }
  }



}
