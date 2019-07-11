import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {DeviceService} from '../shared/device.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  devices:any[];
  constructor(private service:DeviceService) { 
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
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
