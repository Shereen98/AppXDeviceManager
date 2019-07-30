import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import { NotificationService } from "../shared/notification.service";
import { MatDialogRef } from "@angular/material";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    barcode: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    addDate: new FormControl("", Validators.required),
    condition: new FormControl(0, Validators.required),
    status: new FormControl("Unassigned"),
    image: new FormControl("")
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      barcode: "",
      name: "",
      addDate: "",
      condition: 0,
      status: "Unassigned",
      image: ""
    });
  }

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
    this.form.reset();
    this.initializeFormGroup();
  }

  onSubmit() {
    try {
      if (this.form.valid) {
        this.onUpload(event);
        this.service.addDevice(this.form.value);
        this.notificationService.success("Device Added successfully !");
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

  populateForm(device) {
    this.form.patchValue(device);
    debugger;
  }
}
