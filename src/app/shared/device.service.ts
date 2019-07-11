import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { FormGroup,FormControl,Validators} from "@angular/forms";
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private firebase:AngularFireDatabase,private datePipe: DatePipe) { }

  deviceList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key:new FormControl(null),
    barcode: new FormControl('',Validators.required),
    name:new FormControl('',Validators.required),
    addDate: new FormControl('',Validators.required),
    condition:new FormControl(0,Validators.required),
    status:new FormControl('Unassigned')
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      barcode:'',
      name:'',
      addDate: '',
      condition:0,
      status:'Unassigned'
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
      addDate:device.addDate == "" ? "" : this.datePipe.transform(device.hireDate, 'yyyy-MM-dd'),
      condition:device.condition,
      status:device.status
    });
  }

  updateDevice(device){
    this.deviceList.update(device.$key,{
      barcode:device.barcode,
      name:device.name,
      addDate:device.addDate== "" ? "" : this.datePipe.transform(device.hireDate, 'yyyy-MM-dd'),
      condition:device.condition,
      status:device.status
    });
  }

  deleteDevice($key: string){
      this.deviceList.remove($key);
  }
}
