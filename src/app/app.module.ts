import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { environment } from "src/environments/environment";
import { DeviceService } from "./shared/device.service";
import { UserService } from "./shared/user.service";
import { DatePipe } from "@angular/common";
import { NotificationService } from "./shared/notification.service";
import { AddDeviceComponent } from "./add-device/add-device.component";
import { MatConfirmDialogComponent } from "./mat-confirm-dialog/mat-confirm-dialog.component";
import { EditConditionComponent } from "./edit-condition/edit-condition.component";
import { AssignDeviceComponent } from "./assign-device/assign-device.component";
import { AssignDeviceService } from "./shared/assign-device.service";
import { DeviceDetailsComponent } from "./device-details/device-details.component";
import { ReturnDeviceComponent } from "./return-device/return-device.component";
import { UserHomeComponent } from "./user-home/user-home.component";
import { AddReviewComponent } from "./add-review/add-review.component";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MatConfirmDialogComponent,
    DeviceDetailsComponent,
    UserHomeComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DeviceService,
    NotificationService,
    UserService,
    DatePipe,
    AssignDeviceService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddDeviceComponent,
    MatConfirmDialogComponent,
    EditConditionComponent,
    AssignDeviceComponent,
    ReturnDeviceComponent,
    AddReviewComponent,
    DeviceDetailsComponent
  ]
})
export class AppModule {}
