import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssignDeviceComponent } from '../assign-device/assign-device.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user : any;
  constructor(private userService : UserService,
    public dialogRef: MatDialogRef<AssignDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.user = data;
    }

  ngOnInit() {
  }

  resetPassword(){
    this.userService.resetPassword(this.user.email)
      .then(
        () => alert('The password reset link has been sent to your email address'), 
        (rejectionReason) => alert(rejectionReason)) 
      .catch(e => alert('An error occurred while attempting to reset your password')); 
      this.onClose();
  }
  onClose() {
    this.dialogRef.close();
  }
}
