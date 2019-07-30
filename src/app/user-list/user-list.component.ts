import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../shared/user.service";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { NotificationService } from "../shared/notification.service";
import { DialogService } from "../shared/dialog.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  userType = [{ id: 1, value: "Admin" }, { id: 2, value: "Normal-User" }];

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "username",
    "type",
    "email",
    "space",
    "actions"
  ];
  email: string;
  password: string;

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.userService.getUsers().subscribe(list => {
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

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    username: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    type: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      username: "",
      email: "",
      type: "",
      password: ""
    });
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.addUser(this.form.value);
      debugger;
      this.userService.signUp(this.email, this.password);
      this.form.reset();
      this.initializeFormGroup();
      this.notificationService.success("User added successfully !");
    }
  }

  onDelete($key) {
    this.dialogService
      .openConfirmDialog("Are you sure to delete this record ?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.userService.deleteUser($key);
          this.notificationService.warn(" Deleted successfully !");
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
