import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  user: Observable<firebase.User>;
  authState: any;
  userList: AngularFireList<any>;
  array = [];
  userType: String;

  constructor(
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.user = auth.authState;
    this.userList = this.firebase.list("users");
    this.userList.snapshotChanges().subscribe(
      list => {
       this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }
 

  authUser() {
    return this.user;
  }
  getUsers() {
    this.userList = this.firebase.list("users");
    return this.userList.snapshotChanges();
  }

  addUser(user) {
    this.userList.push({
      username: user.username,
      email: user.email,
      type: user.type,
      password: user.password
    });
  }

  signUp(email: string, password: string) {
    this.auth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log("Successfully signed up! ,res");
      })
      .catch(error => {
        console.log("Something is wrong:", error.message);
      });
  }

  signIn(email: string, password: string) {
    this.auth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.authState = res;
        this.getUsers().subscribe(list => {
          let array = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
          console.log(array);
          for (var users of array)
            if (email == users.email) {
              if (users.type == "Admin") {
                this.router.navigate(["device-list"]);
              } else {
                this.router.navigate(["user-home"]);
              }
            }
        });
      })
      .catch(err => {
        console.log("Something is wrong: ", err.message);
      });
  }

  signOut() {
    this.auth.auth.signOut();
    this.router.navigate(["login"]);
  }
  deleteUser($key: string) {
    this.userList.remove($key);
  }
}
