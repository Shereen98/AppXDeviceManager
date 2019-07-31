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
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  listData: MatTableDataSource<any>;
  email: string;
  password: string;
  searchKey: string;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  userType = [{ id: 1, value: "Admin" }, { id: 2, value: "Normal-User" }]; //user types are stored in an array

  /* holds the names of the columns to be displayed in the table */
  displayedColumns: string[] = [
    "username",
    "type",
    "email",
    "space",
    "actions"
  ];

  ngOnInit() {
    //subscribes the observable containing the user detials and stores the data in an array
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

  /* create a new foreGroup object and passes the form controls */
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    username: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    type: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  /* initialize the form group values */
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      username: "",
      email: "",
      type: "",
      password: ""
    });
  }

  // clears the data in the form controls
  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

  /* submits the user details to firebase database */
  onSubmit() {
    if (this.form.valid) {
      this.userService.addUser(this.form.value);
      this.userService.signUp(this.email, this.password);
      this.form.reset();
      this.initializeFormGroup();
      this.notificationService.success("User added successfully !");
    }
  }

  /* deletes the record of the device of the respective device key which passed as the paramater */
  onDelete($key) {
    this.dialogService
      .openConfirmDialog("Are you sure to delete this record ?") //opens a confirmation dialog box
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.userService.deleteUser($key);
          this.notificationService.warn(" Deleted successfully !");
        }
      });
  }

  /* filters data in the table according to the search keys entered */
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  /* concatenates all the objects in the list data and concerts them into lower case */
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
