import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {
  user: Observable<firebase.User>;
  userEmail: string;
  userType: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.authUser(); //stores the user details retrieved from firebase auhtnetication in the user observable
    //subscirbes the observable and stores the email of the user in the userEmail variable
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });

    this.userService.getUsers().subscribe(list => {
      let array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
       return array;
    });
  }

  /* calls the signOut function from the user.service  */
  logout() {
    this.userService.signOut();
  }
}
