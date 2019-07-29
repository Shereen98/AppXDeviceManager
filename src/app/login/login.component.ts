import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/auth.service";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

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
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    debugger;
    this.userService.getUsers();
  }

  onSubmit() {
    this.userService.signIn(this.email, this.password);
  }

  /*logIn(){
    this.authService.login({username:this.username, password: this.password})
    .then(resolve => this.router.navigate(['device-list']))
    .catch(error=> this.errorMsg=error.message);
  }*/
}
