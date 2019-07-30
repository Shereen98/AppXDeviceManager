import { Component, OnInit, Inject } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import { NotificationService } from "../shared/notification.service";
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { DatePipe } from "@angular/common";
import { AddDeviceComponent} from "../add-device/add-device.component";

@Component({
  selector: "app-return-device",
  templateUrl: "./return-device.component.html",
  styleUrls: ["./return-device.component.css"]
})
export class ReturnDeviceComponent implements OnInit {
  returnDevice: any;
  returnDeviceList: AngularFireList<any>;
  constructor(
    private firebase: AngularFireDatabase,
    private deviceService: DeviceService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ReturnDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private deviceForm : AddDeviceComponent
  ) {
    this.returnDevice = data;
  }

  deviceCondition = [
    { id: 1, value: "Good" },
    { id: 2, value: "Average" },
    { id: 3, value: "Not Good" }
  ];
  ngOnInit() {
    this.getReturnDevices();
    this.deviceService.getDevices();
  }

  onSubmit() {
    try {
      if (this.deviceForm.form.valid) {
        this.deviceService.returnStatus(this.deviceForm.form.value);
        this.deviceService.updateCondition(this.deviceForm.form.value);
        this.addReturnDevice(this.deviceForm.form.value);
        //this.service.populateForm(this.service.form.value);
        this.notificationService.success("Device returned successfully !");
        this.deviceForm.form.reset();
        this.deviceForm.initializeFormGroup();
        this.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  onClose() {
    this.deviceForm.form.reset();
    this.deviceForm.initializeFormGroup();
    this.dialogRef.close();
  }

  getReturnDevices() {
    //const obj = this.firebase.database.ref('devices/assign-history');
    try {
      this.returnDeviceList = this.firebase.list(
        "devices/" + this.returnDevice.$key + "/return-history"
      );
      return this.returnDeviceList.snapshotChanges();
    } catch (error) {
      console.log(error);
    }
  }

  addReturnDevice(returnDevice) {
    this.returnDeviceList.push({
      //username: returnDevice.assignHistory.username,
      condition: returnDevice.condition
    });
  }
}
