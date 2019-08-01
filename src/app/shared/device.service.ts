import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { DatePipe } from "@angular/common";
import { UserService } from "./user.service";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class DeviceService {
  constructor(
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe,
    private userService: UserService,
    private storage: AngularFireStorage
  ) {}

  deviceList: AngularFireList<any>;
  assignHistoryList: AngularFireList<any>;
  array = [];
  device: AngularFireObject<any>;
  fetchedDevice = null;
  deviceId;

  /* retieves the device details from the firebase as an observable from angular fire list */
  getDevices() {
    this.deviceList = this.firebase.list("devices");
    return this.deviceList.snapshotChanges();
  }

  /* pushes the object containing the device details into the angular firelist */
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

  /* pushes the object containing the review details into the angular firelist */
  addReview(device) {
    this.deviceList.push({
      review: device.review
    });
  }

  /* pushes the object containing the assign details into the angular firelist */
  addAssignHistory(device) {
    this.deviceList.push({
      username: device.username,
      assignDate:
        device.assignDate == ""
          ? ""
          : this.datePipe.transform(device.assignDate, "yyyy-MM-dd")
    });
  }

  /* calls the update function from angular fru*/
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


}
