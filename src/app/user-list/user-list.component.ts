import { Component, OnInit,ViewChild } from '@angular/core';
import {UserService} from '../shared/user.service';
import { MatTableDataSource,MatSort,MatPaginator,MatDialog,MatDialogConfig  } from '@angular/material';
import { NotificationService } from '../shared/notification.service';
import { DialogService } from '../shared/dialog.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService,
    private dialog:MatDialog,
    private notificationService:NotificationService,
    private dialogService: DialogService) { }

    userType = [
      { id: 1, value: 'Admin' },
      { id: 2, value: 'Normal-User' }
    ]

  listData: MatTableDataSource<any>;
  displayedColumns:string[] = ['username','type','space','actions'];

  @ViewChild(MatSort,null) sort: MatSort;
  @ViewChild(MatPaginator,null) paginator:MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.userService.getUsers().subscribe(
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

  /*onCreate(){
    this.userService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddUserComponent,dialogConfig);

  }*/

  onClear(){
    this.userService.form.reset();
    this.userService.initializeFormGroup();
  }

  onSubmit(){
    if(this.userService.form.valid){
      this.userService.addUser(this.userService.form.value);
      this.userService.form.reset();
      this.userService.initializeFormGroup();
      this.notificationService.success('User added successfully !');
    }
  }

  onDelete($key){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
     .afterClosed().subscribe(res =>{
       if(res){
         this.userService.deleteUser($key);
         this.notificationService.warn(' Deleted successfully !')
       }
     });
   }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
