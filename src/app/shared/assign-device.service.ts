import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { DatePipe } from "@angular/common";
import { DeviceService } from "../shared/device.service";
import { FirebaseDatabase } from "@angular/fire";
import { database } from "firebase";
import { AssignDeviceComponent } from "../assign-device/assign-device.component";

@Injectable({
  providedIn: "root"
})
export class AssignDeviceService {
  constructor(
    private firebase: AngularFireDatabase,
    private deviceService: DeviceService,
    private datePipe: DatePipe
  ) {}

  barcode: firebase.database.Reference;
  assignDeviceList: AngularFireList<any>;
  key: any;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    // barcode: new FormControl (''),
    username: new FormControl("", Validators.required),
    assignDate: new FormControl("", Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      //barcode:'',
      username: "",
      assignDate: ""
    });
  }

  /*getAssignDevices(){
    //const obj = this.firebase.database.ref('devices/assign-history');
    this.assignDeviceList = this.firebase.list('devices');
    return this.assignDeviceList.snapshotChanges();
  }

  addAssignDevice(assignDevice){
    this.assignDeviceList.push({
      assignHistory :({
        barcode:assignDevice.barcode,
        username:assignDevice.username,
        assignDate:assignDevice.assignDate == "" ? "" : this.datePipe.transform(assignDevice.assignDate, 'yyyy-MM-dd'),
      })
    });
  }*/

  getTimeStamp() {
    const now = new Date();
    const date =
      now.getUTCFullYear() +
      "/" +
      (now.getUTCMonth() + 1) +
      "/" +
      now.getUTCDate();

    const time =
      now.getUTCHours() +
      "/" +
      (now.getUTCMinutes() + 1) +
      "/" +
      now.getUTCSeconds();

    return date + " " + time;
  }
}
