import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators} from "@angular/forms";
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebase:AngularFireDatabase,
    private datePipe: DatePipe) { }

  form: FormGroup = new FormGroup({
    $key:new FormControl(null),
    username: new FormControl ('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      username:'',
      password:''
    })
  }
}
