import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule ,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
//import { MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule,MatListModule, MatButtonModule ,MatTableModule,MatDatepickerModule, MatNativeDateModule ,MatFormFieldModule } from  '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { environment } from 'src/environments/environment';
import {DeviceService} from './shared/device.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from './shared/notification.service';
import { AddDeviceComponent } from './add-device/add-device.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MatConfirmDialogComponent,   
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
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [
    DeviceService,
    NotificationService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents:[AddDeviceComponent,MatConfirmDialogComponent]
})
export class AppModule { }
