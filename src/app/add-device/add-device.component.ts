import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import { NotificationService } from "../shared/notification.service";
import { MatDialogRef } from "@angular/material/dialog";
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

  /* defines a property of type formGroup and passes the object containing form controls*/
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    barcode: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    addDate: new FormControl("", Validators.required),
    condition: new FormControl(0, Validators.required),
    status: new FormControl("Unassigned"),
    image: new FormControl("")
  });

  /* Initialize the values of the form controls */
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

  /* Array containing the values and id of the conditions to be used in the static menu */
  deviceCondition = [
    { id: 1, value: "Good" },
    { id: 2, value: "Average" },
    { id: 3, value: "Not Good" }
  ];

  /* Array containg the id and value of the status which is to be displayed as radio buttons */
  deviceStatus = [{ id: 1, value: "Unassigned" }, { id: 2, value: "Assigned" }];

  ngOnInit() {
    this.service.getDevices(); //calls the getDevice() function from the device.service
  }

  /* submits the data retrieved from the form controls to the firebase database by calling the addDevice() function
    from the device.service */
  onSubmit() {
    try {
      if (this.form.valid) {
        this.onUpload(event);
        this.service.addDevice(this.form.value);
        this.notificationService.success("Device Added successfully !"); //calls the success() function from the notification.service which passes a message as an parameter which is to be displayed once the device gets successfully added
        this.form.reset(); //resets the form 
        this.initializeFormGroup(); //initializes the form values by callling the initializeFormGroup() method
        this.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* closes the dialog box which contains the form after adding the device successfully */
  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  /* uploads the image to the firebase storage */
  onUpload(event) {
    const id = Math.random()
      .toString(36)
      .substring(2);
    this.ref = this.storage.ref(id);
    this.task = this.ref.put(this.selectedImage);
  }

  /* populates the data of the device passed as the parameter to the form fields */
  populateForm(device) {
    this.form.patchValue(device);
  }
}
