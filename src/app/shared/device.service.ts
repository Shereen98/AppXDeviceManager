import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { FormGroup,FormControl,Validators} from "@angular/forms";
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import {UserService} from './user.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadTask } from '@angular/fire/storage/interfaces';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private firebase:AngularFireDatabase,private datePipe: DatePipe,
    private userService:UserService,private storage:AngularFireStorage) { }

  deviceList: AngularFireList<any>;
  assignList:AngularFireList<any>;
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

  assignForm: FormGroup = new FormGroup({
    device:new FormControl(null),
    user:new FormControl(null),
    date:new FormControl(''),
    condition:new FormControl(0)
  })

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      barcode:'',
      name:'',
      addDate: '',
      condition:0,
      status:'Unassigned',
      image:''
    }),

    this.assignForm.setValue({
      device:null,
      user: null,
      date:'',
      condition:0
    })
  }

  getDevices(){
    this.deviceList = this.firebase.list('devices');
    return this.deviceList.snapshotChanges();
  }

  getAssignDevices(){
    this.assignList = this.firebase.list('assign-devices');
    return this.assignList.snapshotChanges();
  }

  addDevice(device){
    this.deviceList.push({
      barcode:device.barcode,
      name:device.name,
      addDate:device.addDate == "" ? "" : this.datePipe.transform(device.addDate, 'yyyy-MM-dd'),
      condition:device.condition,
      status:device.status,
      image:device.image
      //imagePath:'${device.name}/${device.image}_${new Date().getTime()}'
    });
  }

  addAssignDevice(assignDevice){
    this.assignList.push({
      device:assignDevice.device,
      user:assignDevice.user,
      date:assignDevice.date== "" ? "" : this.datePipe.transform(assignDevice.date,'yyyy-MM-dd')
    })
  }

  updateDevice(device){
    this.deviceList.update(device.$key,{
      condition:device.condition
    });
  }

  deleteDevice($key: string){
      this.deviceList.remove($key);
  }
}
