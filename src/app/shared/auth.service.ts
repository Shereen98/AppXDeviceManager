import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "../shared/user.service";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userList: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe,
    private userService: UserService
  ) {}

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      email: "",
      password: ""
    });
  }
}
