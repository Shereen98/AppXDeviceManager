import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { stringify } from 'querystring';

@Injectable({
  providedIn: "root"
})
export class UserService {
  user: Observable<firebase.User>;
  authState: any;
  userList: AngularFireList<any>;
  array = [];
  userType: any;
  authResult: boolean;
  userData : any;

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

     // Setting logged in user in localstorage else null
     this.auth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        for(var users of this.array){
          if (users.email == this.userData.email){
            console.log(this.userData);
            localStorage.setItem('user', JSON.stringify(this.userData));
            localStorage.setItem('userType',JSON.stringify(users.type));

          }
        }
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }


  authUser() {
    return this.user;
  }

  get isLoggedIn() :boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !==null) ? true : false;
  }

  get typeOfUser() :boolean{
    const type = JSON.parse(localStorage.getItem('userType'));
    return (type == "Admin") ? true : false;
  }

  getUsers() {
    this.userList = this.firebase.list("users");
    return this.userList.snapshotChanges();
  }

  addUser(user) {
    this.userList.push({
      username: user.username,
      email: user.email,
      type: user.type
      //password: user.password
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
        this.authResult = false;
        console.log("Something is wrong: ", err.message);
      });
  }

  resetPassword(email: string) {
    return this.auth.auth
      .sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch(error => console.log(error));
  }

  signOut() {
    this.auth.auth.signOut();
    this.router.navigate(["login"]);
  }

  deleteUser($key: string) {
    this.userList.remove($key);
  }
}
