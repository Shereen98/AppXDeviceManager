import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators} from "@angular/forms";
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase:AngularFireDatabase,private datePipe: DatePipe) { }

  userList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key:new FormControl(null),
    username: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      username:'',
      type: '',
      password:''
    })
  }
  getUsers(){
    this.userList = this.firebase.list('users');
    return this.userList.snapshotChanges();
  }

  addUser(user){
    this.userList.push({
      username:user.username,
      type:user.type,
      password:user.password
    });
  }
  deleteUser($key: string){
    this.userList.remove($key);
}
}
