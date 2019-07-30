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
    private deviceForm : AddDeviceComponent
  ) {}

  deviceCondition = [
    { id: 1, value: "Good" },
    { id: 2, value: "Average" },
    { id: 3, value: "Not Good" }
  ];
  ngOnInit() {
    this.service.getDevices();
  }

  onSubmit() {
    if (this.deviceForm.form.valid) {
      if (this.deviceForm.form.get("$key").value) {
        this.service.updateCondition(this.deviceForm.form.value);
      }
      this.deviceForm.form.reset();
      this.deviceForm.initializeFormGroup();
      this.notificationService.success("Condition changed !");
      this.onClose();
    }
  }
  onClose() {
    this.deviceForm.form.reset();
    this.deviceForm.initializeFormGroup();
    this.dialogRef.close();
  }
}
