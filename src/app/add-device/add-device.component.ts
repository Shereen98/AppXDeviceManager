import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import { NotificationService } from "../shared/notification.service";
import { MatDialogRef } from "@angular/material";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.css"]
})
export class AddDeviceComponent implements OnInit {
  devices: any[];
  selectedImage: File = null;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  barcode: string;

  constructor(
    private service: DeviceService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddDeviceComponent>,
    private storage: AngularFireStorage,
    public http: HttpClient
  ) {}

  deviceCondition = [
    { id: 1, value: "Good" },
    { id: 2, value: "Average" },
    { id: 3, value: "Not Good" }
  ];

  deviceStatus = [{ id: 1, value: "Unassigned" }, { id: 2, value: "Assigned" }];

  ngOnInit() {
    this.service.getDevices();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  /*onSubmit(){
    if(this.service.form.valid){
      if (!this.service.form.get('$key').value){
        this.service.addDevice(this.service.form.value);
        this.notificationService.success('Device added successfully !');
      }
      else{
        this.service.updateCondition(this.service.form.value);
        this.notificationService.success('Condition changed successfully !');
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
      //this.service.addDevice(this.service.form.value);
      //this.service.form.reset();
      //this.service.initializeFormGroup();
      
    }
  }*/

  onSubmit() {
    try {
      if (this.service.form.valid) {
        this.onUpload(event);
        this.service.addDevice(this.service.form.value);
        this.notificationService.success("Device Added successfully !");
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onFileSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }
  onUpload(event) {
    const id = Math.random()
      .toString(36)
      .substring(2);
    this.ref = this.storage.ref(id);
    this.task = this.ref.put(this.selectedImage);
  }
}
