import { Component, OnInit, Inject } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import {UserService} from "../shared/user.service"
import { NotificationService } from "../shared/notification.service";
import { MatDialogRef } from "@angular/material";
import { AddDeviceComponent } from "../add-device/add-device.component";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { MAT_DIALOG_DATA } from "@angular/material";
import { DatePipe } from "@angular/common";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-assign-device",
  templateUrl: "./assign-device.component.html",
  styleUrls: ["./assign-device.component.css"]
})
export class AssignDeviceComponent implements OnInit {
  assignDevice: any;
  deviceKey: [];
  assignDeviceList: AngularFireList<any>;
  userList : AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase,
    private deviceForm: AddDeviceComponent,
    private service: DeviceService,
    private notificationService: NotificationService,
    private userService : UserService,
    public dialogRef: MatDialogRef<AssignDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.assignDevice = data;
  }

 /* defines a property of type formGroup and passes the object containing form controls*/
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    username: new FormControl("", Validators.required),
    assignDate: new FormControl("", Validators.required)
  });

  ngOnInit() {
    this.getAssignDevices();
    this.service.getDevices();
  }

  /* submits the assigned details to the firebase database after checking the validity*/
  onSubmit() {
      if (this.form.valid) {
        this.service.updateStatus(this.deviceForm.form.value); // changes the value of the status to assigned
        this.deviceForm.populateForm(this.deviceForm.form.value); //calls the populateForm function and gets the details of the respective device which is to be assigned
        this.addAssignDevice(this.form.value); //adds the assigned details to the firebase by calling the addAssignDevice() function
        this.notificationService.success("Device assigned successfully !");
        this.form.reset();
        this.initializeFormGroup();
        this.onClose();
      }
  }

  /* closes the dialog box which contains the form after assigning the device successfully */
  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  /* retrieves the assigned detials added to the firebase database as an observable */
  getAssignDevices() {
    this.assignDeviceList = this.firebase.list(
      "devices/" + this.assignDevice.$key + "/assign-history"
    );
    return this.assignDeviceList.snapshotChanges();
  }

  /* adds the assigned details to the firebase database */
  addAssignDevice(assignDevice) {
    this.assignDeviceList.push({
      username: assignDevice.username,
      assignDate:
        assignDevice.assignDate == ""
          ? ""
          : this.datePipe.transform(assignDevice.assignDate, "yyyy-MM-dd")
    });
  }

  /* initialize the form control values */
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      username: "",
      assignDate: ""
    });
  }
}
