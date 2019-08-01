import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireList } from "@angular/fire/database";
import { AngularFireDatabase } from "@angular/fire/database";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DeviceService } from "../shared/device.service";
import { NotificationService } from "../shared/notification.service";

@Component({
  selector: "app-add-review",
  templateUrl: "./add-review.component.html",
  styleUrls: ["./add-review.component.css"]
})
export class AddReviewComponent implements OnInit {
  reviewList: AngularFireList<any>;
  review: any;
  constructor(
    private firebase: AngularFireDatabase,
    public dialogRef: MatDialogRef<AddReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deviceService: DeviceService,
    private notificationService: NotificationService
  ) {
    this.review = data;
  }

  ngOnInit() {
    this.getReviews(); // retrieves the reviews for particular device
    this.deviceService.getDevices(); //calls the getDevices() function from the device.service
  }

  /* defines a property of type formGroup and passes the object containing form controls*/
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    review: new FormControl("")
  });

  /* initialize the form control values */
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      review: ""
    });
  }

  /* sends data retrieved from the form to the firebase database after checking the validity of the data */
  onSubmit() {
    try {
      if (this.form.valid) {
        this.deviceService.addReview(this.form.value); //calls the addReview() function from the device.service inorder to send the data to firebase
        this.notificationService.success("Review added successfully !"); // message passed as a parameter for the success function called from the notification.service which is to be displayed after adding a review successfully
        this.form.reset(); //resets the form fields
        this.initializeFormGroup(); //initializes the form
        this.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* gets the reviews added to the firebase database as an observable */
  getReviews() {
    this.reviewList = this.firebase.list(
      "devices/" + this.review.$key + "/reviews"
    );
    return this.reviewList.snapshotChanges();
  }

  /* closes the pop up once the data is submitted */
  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }
}
