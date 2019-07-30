import { Component, OnInit, Inject } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import { UserService } from "../shared/user.service";
import { NotificationService } from "../shared/notification.service";
import { MatDialogRef } from "@angular/material";
import {AddDeviceComponent} from "../add-device/add-device.component"
import {
  AngularFireList,
  AngularFireDatabase
} from "@angular/fire/database";
import { MAT_DIALOG_DATA } from "@angular/material";
import { DatePipe } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    private deviceForm : AddDeviceComponent,
    private service: DeviceService,
    private notificationService: NotificationService,
    private userService: UserService,
    public dialogRef: MatDialogRef<AssignDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.assignDevice = data;
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    // barcode: new FormControl (''),
    username: new FormControl("", Validators.required),
    assignDate: new FormControl("", Validators.required)
  });

  ngOnInit() {
    this.getAssignDevices();
    this.service.getDevices();
  }
  onSubmit() {
    try {
      if (this.form.valid) {
        this.service.updateStatus(this.deviceForm.form.value);
        this.deviceForm.populateForm(this.deviceForm.form.value);
        this.addAssignDevice(this.form.value);
        this.notificationService.success("Device assigned successfully !");
        this.form.reset();
        this.initializeFormGroup();
        this.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
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

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      //barcode:'',
      username: "",
      assignDate: ""
    });
  }

}
