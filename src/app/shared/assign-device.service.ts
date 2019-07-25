import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators} from "@angular/forms";
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import { DatePipe } from '@angular/common';
import {DeviceService} from '../shared/device.service';
import { FirebaseDatabase } from '@angular/fire';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AssignDeviceService {

  constructor(private firebase:AngularFireDatabase,
    private deviceService:DeviceService,
    private datePipe: DatePipe) {
    }

  barcode : firebase.database.Reference;
  assignDeviceList : AngularFireList<any>;
 

  form: FormGroup = new FormGroup({
    $key:new FormControl(null),
    barcode: new FormControl (''),
    username: new FormControl('',Validators.required),
    assignDate: new FormControl('',Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      barcode:'',
      username:'',
      assignDate:''
    })
  }

  getAssignDevices(){
    this.assignDeviceList = this.firebase.list('assign-devices');
    return this.assignDeviceList.snapshotChanges();
  }

  addAssignDevice(assignDevice){
    this.assignDeviceList.push({
      barcode:assignDevice.barcode,
      username:assignDevice.username,
      assignDate:assignDevice.assignDate == "" ? "" : this.datePipe.transform(assignDevice.assignDate, 'yyyy-MM-dd')
    });
  }
}
