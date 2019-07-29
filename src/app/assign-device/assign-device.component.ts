import { Component, OnInit, Inject } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import { UserService } from "../shared/user.service";
import { NotificationService } from "../shared/notification.service";
import { AssignDeviceService } from "../shared/assign-device.service";
import { MatDialogRef } from "@angular/material";
import {
  AngularFireList,
  AngularFireDatabase
} from "@angular/fire/database";
import { MAT_DIALOG_DATA } from "@angular/material";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-assign-device",
  templateUrl: "./assign-device.component.html",
  styleUrls: ["./assign-device.component.css"]
})
export class AssignDeviceComponent implements OnInit {
  assignDevice: any;
  deviceKey: [];
  assignDeviceList: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase,
    private service: DeviceService,
    private notificationService: NotificationService,
    private userService: UserService,
    private assignService: AssignDeviceService,
    public dialogRef: MatDialogRef<AssignDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.assignDevice = data;
  }

  ngOnInit() {
    this.getAssignDevices();
    this.service.getDevices();
  }
  onSubmit() {
    try {
      if (this.assignService.form.valid) {
        this.service.updateStatus(this.service.form.value);
        this.service.populateForm(this.service.form.value);
        this.addAssignDevice(this.assignService.form.value);
        this.notificationService.success("Device assigned successfully !");
        this.assignService.form.reset();
        this.assignService.initializeFormGroup();
        this.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  onClose() {
    this.assignService.form.reset();
    this.assignService.initializeFormGroup();
    this.dialogRef.close();
  }

  getAssignDevices() {
    this.assignDeviceList = this.firebase.list(
      "devices/" + this.assignDevice.$key + "/assign-history"
    );
    return this.assignDeviceList.snapshotChanges();
  }

  addAssignDevice(assignDevice) {
    this.assignDeviceList.push({
      username: assignDevice.username,
      assignDate:
        assignDevice.assignDate == ""
          ? ""
          : this.datePipe.transform(assignDevice.assignDate, "yyyy-MM-dd")
    });
  }
}
