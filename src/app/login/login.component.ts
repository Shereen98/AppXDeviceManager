import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMsg: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    debugger;
    this.userService.getUsers();
  }
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

  onSubmit() {
    this.userService.signIn(this.email, this.password);
  }
}
