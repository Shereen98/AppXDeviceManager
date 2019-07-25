import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators} from "@angular/forms";
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import { DatePipe } from '@angular/common';
import {UserService} from './user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private firebase:AngularFireDatabase,private datePipe: DatePipe,
    private userService:UserService,private storage:AngularFireStorage) { 
      this.deviceList = this.firebase.list('devices');
      this.deviceList.snapshotChanges().subscribe(
        list => {
          this.array = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val() 
            }
          })
        });
    }

  deviceList: AngularFireList<any>;
  array = [];
  
  private basePath:string='/images';
  private uploadTask:firebase.storage.UploadTask;

  form: FormGroup = new FormGroup({
    $key:new FormControl(null),
    barcode: new FormControl('',Validators.required),
    name:new FormControl('',Validators.required),
    addDate: new FormControl('',Validators.required),
    condition:new FormControl(0,Validators.required),
    status:new FormControl('Unassigned'),
    image:new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      barcode:'',
      name:'',
      addDate: '',
      condition:0,
      status:'Unassigned',
      image:''
    })
  }

  getDevices(){
    this.deviceList = this.firebase.list('devices');
    return this.deviceList.snapshotChanges();
  }

  addDevice(device){
    this.deviceList.push({
      barcode:device.barcode,
      name:device.name,
      addDate:device.addDate == "" ? "" : this.datePipe.transform(device.addDate, 'yyyy-MM-dd'),
      condition:device.condition,
      status:device.status,
      image:device.image
    });
  }

  updateCondition(device){
    this.deviceList.update(device.$key,{
      condition:device.condition
    });
  }

  updateStatus(device){
    this.deviceList.update(device.$key,{
      status: 'Assigned'
    })
  }

  deleteDevice($key: string){
      this.deviceList.remove($key);
  }

  populateForm(device){
    this.form.setValue(device);
  }
}
