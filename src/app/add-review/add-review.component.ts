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

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    review: new FormControl("")
  });

  ngOnInit() {
    this.getReviews();
    this.deviceService.getDevices();
  }

  onSubmit() {
    try {
      if (this.form.valid) {
        this.deviceService.addReview(this.form.value);
        this.notificationService.success("Review added successfully !");
        this.form.reset();
        this.initializeFormGroup();
        this.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  getReviews() {
    this.reviewList = this.firebase.list(
      "devices/" + this.review.$key + "/reviews"
    );
    return this.reviewList.snapshotChanges();
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      review: ""
    });
  }
}
