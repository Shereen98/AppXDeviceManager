import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../shared/device.service';
import {NotificationService } from '../shared/notification.service';
import {MatDialogRef} from '@angular/material';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  devices:any[];
  selectedImage:File=null;
  ref:AngularFireStorageReference;
  task:AngularFireUploadTask;

  constructor(private service:DeviceService,
    private notificationService:NotificationService,
    public dialogRef:MatDialogRef<AddDeviceComponent>,
    private storage:AngularFireStorage,public http:HttpClient) { 
  }

  deviceCondition = [
    { id: 1, value: 'Good' },
    { id: 2, value: 'Average' },
    { id: 3, value: 'Not Good' },
  ]

  deviceStatus = [
    { id: 1, value: 'Unassigned'},
    { id: 2, value: 'Assigned'}
  ]

  ngOnInit() {
    this.service.getDevices();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      this.onUpload()

            this.service.addDevice(this.service.form.value);
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.notificationService.success('Device added successfully !');
            this.onClose();
      //this.service.addDevice(this.service.form.value);
      //this.service.form.reset();
      //this.service.initializeFormGroup();
      
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onFileSelected(event){
    this.selectedImage=<File>event.target.files[0];
  
  }
  /*onUpload(event){
    const id=Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
  }*/
  
  onUpload(){
    const fd = new FormData();
    fd.append('image',this.selectedImage,this.selectedImage.name);
    this.http.post('https://us-central1-appx-device-manager.cloudfunctions.net/uploadFile',fd)
    .subscribe((res : any) => {
      data => console.log('success', data)
        error => console.log('oops', error)
      
    })
    
  }

}
