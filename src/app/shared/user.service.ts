import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { getMaxListeners } from "cluster";

@Injectable({
  providedIn: "root"
})
export class UserService {
  user: Observable<firebase.User>;
  authState: any;

  constructor(
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.user = auth.authState;

    this.userList = this.firebase.list("users");
    this.userList.snapshotChanges().subscribe(list => {
      this.array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  userList: AngularFireList<any>;
  array = [];

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
        if (email == "admin@gmail.com") {
          this.router.navigate(["device-list"]);
        } else {
          this.router.navigate(["user-home"]);
        }

        console.log("Successfully signed in!", this.authState);
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
