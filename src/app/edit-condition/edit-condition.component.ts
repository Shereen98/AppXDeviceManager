import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import { MatDialogRef } from "@angular/material";
import { NotificationService } from "../shared/notification.service";

@Component({
  selector: "app-edit-condition",
  templateUrl: "./edit-condition.component.html",
  styleUrls: ["./edit-condition.component.css"]
})
export class EditConditionComponent implements OnInit {
  constructor(
    private service: DeviceService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EditConditionComponent>
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
    if (this.service.form.valid) {
      if (this.service.form.get("$key").value) {
        this.service.updateCondition(this.service.form.value);
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success("Condition changed !");
      this.onClose();
    }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
