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

  /* array holds the values of the condtions which is passed to the static menu of the form */
  deviceCondition = [
    { id: 1, value: "Good" },
    { id: 2, value: "Average" },
    { id: 3, value: "Not Good" }
  ];
  ngOnInit() {
    this.getReturnDevices();
    this.deviceService.getDevices();
  }

  /* submits the form data containing the retun device details to firebase and updates the relevant fields */
  onSubmit() {
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
  }

  /* closes the dialog box */
  onClose() {
    this.deviceForm.form.reset();
    this.deviceForm.initializeFormGroup();
    this.dialogRef.close();
  }

  /* gets the return device detials as an observable */
  getReturnDevices() {
      this.returnDeviceList = this.firebase.list(
        "devices/" + this.returnDevice.$key + "/return-history"
      );
      return this.returnDeviceList.snapshotChanges();
  }

  /* adds return device details to the firebase database */
  addReturnDevice(returnDevice) {
    this.returnDeviceList.push({
      //username: returnDevice.assignHistory.username,
      condition: returnDevice.condition
    });
  }
}
