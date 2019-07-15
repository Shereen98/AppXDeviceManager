import { Component, OnInit,ViewChild } from '@angular/core';
import { DeviceService } from '../shared/device.service';
import { MatTableDataSource,MatSort,MatPaginator,MatDialog,MatDialogConfig } from '@angular/material';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { NotificationService } from '../shared/notification.service';
import { DialogService } from '../shared/dialog.service';
import { EditConditionComponent } from '../edit-condition/edit-condition.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  constructor(private service:DeviceService,
    private dialog:MatDialog,
    private notificationService:NotificationService,
    private dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns:string[] = ['barcode','name','condition','status','actions'];

  @ViewChild(MatSort,null) sort: MatSort;
  @ViewChild(MatPaginator,null) paginator:MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getDevices().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key:item.key,
            ...item.payload.val()
          };
        });
        this.listData=new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "78%";
    this.dialog.open(AddDeviceComponent,dialogConfig);

  }

  onDelete($key){
   this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteDevice($key);
        this.notificationService.warn(' Deleted successfully !')
      }
    });
  }

  editCondition($key){
    //this.service.populateForm($key);
    const dialogConditionConfig = new MatDialogConfig();
    dialogConditionConfig.disableClose=false;
    dialogConditionConfig.autoFocus=true;
    dialogConditionConfig.width= "30%" ;
    this.dialog.open(EditConditionComponent,dialogConditionConfig);
  }
}
