import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { DeviceService } from "../shared/device.service";
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Component({
  selector: "app-device-details",
  templateUrl: "./device-details.component.html",
  styleUrls: ["./device-details.component.css"]
})
export class DeviceDetailsComponent implements OnInit {
  deviceKey: any;
  device: any;
  deviceList: AngularFireList<any>;
  fileUploads: any[];
  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private firebase: AngularFireDatabase
  ) {}

  ngOnInit() {
    /* retrieves the data of the device with the key passed as the route parameter */
    try {
      this.route.params.subscribe(params => {
        //this.deviceList= this.firebase.list('devices/' + params['deviceKey'])
        // this.device = this.deviceService.getSingleDevice(params['deviceKey']);
        // this.device = this.firebase.object('/devices/' + params['deviceKey']);
        const allDevices = this.firebase.database.ref("devices");
        allDevices.on("value", device => {
          this.device = device.child(params["deviceKey"]).val();
        });
        //   console.log(params['deviceKey'])
        //   console.log(this.deviceList)
        //   return this.deviceList;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
