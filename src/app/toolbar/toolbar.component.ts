import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {
  user: Observable<firebase.User>;
  userEmail: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
  }

  logout() {
    this.userService.signOut();
  }
}
