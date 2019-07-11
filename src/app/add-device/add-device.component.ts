import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../shared/device.service';
import {NotificationService } from '../shared/notification.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  devices:any[];
  constructor(private service:DeviceService,
    private notificationService:NotificationService,
    public dialogRef:MatDialogRef<AddDeviceComponent>) { 
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
      this.service.addDevice(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Device added successfully !');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
