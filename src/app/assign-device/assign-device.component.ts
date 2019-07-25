import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../shared/device.service';
import {UserService} from '../shared/user.service';
import {NotificationService } from '../shared/notification.service';
import {AssignDeviceService} from '../shared/assign-device.service';
import {MatDialogRef} from '@angular/material';
import {AddDeviceComponent} from '../add-device/add-device.component'
import { snapshotChanges } from '@angular/fire/database';

@Component({
  selector: 'app-assign-device',
  templateUrl: './assign-device.component.html',
  styleUrls: ['./assign-device.component.css']
})
export class AssignDeviceComponent implements OnInit {

  assignDevices:any[];

  constructor(private service:DeviceService,
    private notificationService:NotificationService,
    private userService:UserService,
    private assignService:AssignDeviceService,
    public dialogRef:MatDialogRef<AssignDeviceComponent>) { }

    

  ngOnInit() {
    this.assignService.getAssignDevices();
  }

  onSubmit(){
    try {
      if(this.assignService.form.valid){
        this.service.updateStatus(this.service.form.value);
        //this.service.populateForm(this.service.form.value);
        this.assignService.addAssignDevice(this.assignService.form.value);
        this.notificationService.success("Device assigned successfully !");
        this.assignService.form.reset();
        this.assignService.initializeFormGroup();
        this.onClose();
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  onClose(){
    this.assignService.form.reset();
    this.assignService.initializeFormGroup();
    this.dialogRef.close();
  }
}
/*onSubmitt() {
  if (this.service.form.valid) {
    if (this.service.form.get('$key').value){
    this.service.updateCondition(this.service.form.value);
    }
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success('Condition changed !');
    this.onClose();
  }
}*/