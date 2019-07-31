import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import { MatDialogRef } from "@angular/material";
import { NotificationService } from "../shared/notification.service";
import { AddDeviceComponent } from "../add-device/add-device.component";

@Component({
  selector: "app-edit-condition",
  templateUrl: "./edit-condition.component.html",
  styleUrls: ["./edit-condition.component.css"]
})
export class EditConditionComponent implements OnInit {
  constructor(
    private service: DeviceService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EditConditionComponent>,
    private deviceForm: AddDeviceComponent
  ) {}

 /* array holds the values of the condtions which is passed to the static menu of the form */
  deviceCondition = [
    { id: 1, value: "Good" },
    { id: 2, value: "Average" },
    { id: 3, value: "Not Good" }
  ];
  ngOnInit() {
    this.service.getDevices();
  }

  /* validates the form values and passes the new condition of the device to the firebase and updates the condition field */
  onSubmit() {
    if (this.deviceForm.form.valid) {
      //checks for the device key value
      if (this.deviceForm.form.get("$key").value) { 
        this.service.updateCondition(this.deviceForm.form.value); //updates the condtion value in the firebase database
      }
      this.deviceForm.form.reset();
      this.deviceForm.initializeFormGroup();
      this.notificationService.success("Condition changed !");
      this.onClose();
    }
  }

  /* closes the dialog box */
  onClose() {
    this.deviceForm.form.reset();
    this.deviceForm.initializeFormGroup();
    this.dialogRef.close();
  }
}
