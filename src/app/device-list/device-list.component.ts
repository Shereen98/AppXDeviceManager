import { Component, OnInit, ViewChild } from "@angular/core";
import { DeviceService } from "../shared/device.service";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { AddDeviceComponent } from "../add-device/add-device.component";
import { NotificationService } from "../shared/notification.service";
import { DialogService } from "../shared/dialog.service";
import { EditConditionComponent } from "../edit-condition/edit-condition.component";
import { AssignDeviceComponent } from "../assign-device/assign-device.component";
import { ReturnDeviceComponent } from "../return-device/return-device.component";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AddReviewComponent } from "../add-review/add-review.component";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.css"]
})
export class DeviceListComponent implements OnInit {
  constructor(
    private service: DeviceService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private firebase: AngularFireDatabase,
    private deviceForm: AddDeviceComponent
  ) {}

  devices: any;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ["barcode", "name", "condition", "actions"];

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.devices = this.firebase.list("devices");
    this.service.getDevices().subscribe(list => {
      let array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  /* filters data in the table according to the search keys entered */
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  /* concatenates all the objects in the list data and concerts them into lower case */
  applyFilter() {
    this.listData.filter = this.searchKey ? this.searchKey.trim().toLowerCase() : null;
  }

  /* opens up the dialog box /pop up which contains the form to add details of a device */
  onCreate() {
    this.deviceForm.initializeFormGroup();
    const dialogConfig = new MatDialogConfig(); //creates a new MatDialogConfig object
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "78%";
    dialogConfig.height = "70%;";
    this.dialog.open(AddDeviceComponent, dialogConfig); //passes the component and the config object as paramters to the open function in order to open up the pop up
  }

  /* opens up the pop up with the current condition of the device for the user to edit */
  editCondition(row) {
    this.deviceForm.populateForm(row); //populates the current details of the device on to the form fields
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "38%";
    this.dialog.open(EditConditionComponent, dialogConfig);
  }

  /* deletes the record of the device from the table as well as from the firebase database */
  onDelete($key) {
    this.dialogService
      .openConfirmDialog("Are you sure to delete this record ?") //open ups the confirmation dialog box
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.service.deleteDevice($key); //calls the deleteDevice() function from the device.service and passes the $key of the device to be deleted
          this.notificationService.warn(" Deleted successfully !");
        }
      });
  }

  /* opens up the pop up containing the form to assign a device for a user */
  assignDevice(row) {
    //this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "60%";
    dialogConfig.data = row; //conatins the data of the device selected
    this.dialog.open(AssignDeviceComponent, dialogConfig);
  }

  /* opens up the pop up to add detials required to return a device */
  returnDevice(row) {
    try {
      this.deviceForm.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "50%";
      dialogConfig.height = "50%";
      dialogConfig.data = row; //conatins the data of the device selected
      this.dialog.open(ReturnDeviceComponent, dialogConfig);
    } catch (error) {
      console.log(error);
    }
  }

  /* opens up the dialog box which contains a field to add reviews to a particular object */
  addReview(row) {
    try {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "50%";
      dialogConfig.height = "50%";
      dialogConfig.data = row; //conatins the data of the device selected
      this.dialog.open(AddReviewComponent, dialogConfig);
    } catch (error) {
      console.log(error);
    }
  }
}
