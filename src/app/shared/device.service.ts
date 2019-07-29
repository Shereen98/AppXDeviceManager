import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { DatePipe } from "@angular/common";
import { UserService } from "./user.service";
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from "firebase";
import { AssignDeviceService } from "../shared/assign-device.service";

@Injectable({
  providedIn: "root"
})
export class DeviceService {
  constructor(
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe,
    private userService: UserService,
    private storage: AngularFireStorage
  ) {
    this.deviceList = this.firebase.list("devices");
    this.deviceList.snapshotChanges().subscribe(list => {
      this.array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  deviceList: AngularFireList<any>;
  assignHistoryList: AngularFireList<any>;
  array = [];
  device: AngularFireObject<any>;
  fetchedDevice = null;
  deviceId;

  private basePath: string = "/images";
  private uploadTask: firebase.storage.UploadTask;

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

  getDevices() {
    this.deviceList = this.firebase.list("devices");
    // this.assignHistoryList=this.firebase.list('devices');
    return this.deviceList.snapshotChanges();
  }

  getSingleDevice($key) {
    //firebase pass by id ('devices/:id');
  }

  addDevice(device) {
    this.deviceList.push({
      barcode: device.barcode,
      name: device.name,
      addDate:
        device.addDate == ""
          ? ""
          : this.datePipe.transform(device.addDate, "yyyy-MM-dd"),
      condition: device.condition,
      status: device.status,
      image: device.image
    });
  }

  addReview(device) {
    this.deviceList.push({
      review: device.review
    });
  }

  addAssignHistory(device) {
    this.deviceList.push({
      //assignHistory: device.assignHistory,
      username: device.username,
      assignDate:
        device.assignDate == ""
          ? ""
          : this.datePipe.transform(device.assignDate, "yyyy-MM-dd")
    });
  }

  updateCondition(device) {
    this.deviceList.update(device.$key, {
      condition: device.condition
    });
  }

  updateStatus(device) {
    this.deviceList.update(device.$key, {
      status: "Assigned"
    });
  }

  returnStatus(device) {
    this.deviceList.update(device.$key, {
      status: "Unassigned"
    });
  }

  deleteDevice($key: string) {
    this.deviceList.remove($key);
  }

  populateForm(device) {
    // debugger;
    this.form.patchValue(device);
    debugger;
  }
}
