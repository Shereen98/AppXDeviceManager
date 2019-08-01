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
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"]
})
export class UserHomeComponent implements OnInit {
  constructor(
    private service: DeviceService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private firebase: AngularFireDatabase,
    private deviceForm : AddDeviceComponent
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
      //console.log(this.listData);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.deviceForm.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "78%";
    dialogConfig.height = "70%;";
    this.dialog.open(AddDeviceComponent, dialogConfig);
  }

  editCondition(row) {
    this.deviceForm.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "38%";
    this.dialog.open(EditConditionComponent, dialogConfig);
  }
  onDelete($key) {
    this.dialogService
      .openConfirmDialog("Are you sure to delete this record ?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.service.deleteDevice($key);
          this.notificationService.warn(" Deleted successfully !");
        }
      });
  }

  assignDevice(row) {
    //debugger;
    //this.service.initializeFormGroup();
    //this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "60%";
    dialogConfig.data = row;
    this.dialog.open(AssignDeviceComponent, dialogConfig);
  }

  returnDevice(row) {
      this.deviceForm.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "50%";
      dialogConfig.height = "50%";
      dialogConfig.data = row;
      this.dialog.open(ReturnDeviceComponent, dialogConfig);
  }
}
