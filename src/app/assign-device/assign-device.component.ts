import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../shared/device.service';
import {NotificationService } from '../shared/notification.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-assign-device',
  templateUrl: './assign-device.component.html',
  styleUrls: ['./assign-device.component.css']
})
export class AssignDeviceComponent implements OnInit {

  assignDevices:any[];
  constructor(private service:DeviceService,
    private notificationService:NotificationService) { }

  deviceCondition = [
      { id: 1, value: 'Good' },
      { id: 2, value: 'Average' },
      { id: 3, value: 'Not Good' },
  ]

  ngOnInit() {
    this.service.getAssignDevices();
  }

}
