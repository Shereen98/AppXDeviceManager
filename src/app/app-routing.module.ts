import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";

import { AddDeviceComponent } from "./add-device/add-device.component";
import { AssignDeviceComponent } from "./assign-device/assign-device.component";
import { ReturnDeviceComponent } from "./return-device/return-device.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { DeviceListComponent } from "./device-list/device-list.component";
import { EditConditionComponent } from "./edit-condition/edit-condition.component";
import { UserListComponent } from "./user-list/user-list.component";
import { DeviceDetailsComponent } from "./device-details/device-details.component";
import { UserHomeComponent } from "./user-home/user-home.component";
import { AddReviewComponent } from "./add-review/add-review.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "add-device", component: AddDeviceComponent },
  { path: "assign-device", component: AssignDeviceComponent },
  { path: "return-device", component: ReturnDeviceComponent },
  { path: "toolbar", component: ToolbarComponent },
  { path: "edit-condition", component: EditConditionComponent },
  { path: "user-list", component: UserListComponent },
  { path: "device-list/:deviceKey", component: DeviceDetailsComponent },
  { path: "device-list", component: DeviceListComponent },
  { path: "user-home", component: UserHomeComponent },
  { path: "add-review", component: AddReviewComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  AddDeviceComponent,
  AssignDeviceComponent,
  ReturnDeviceComponent,
  ToolbarComponent,
  DeviceListComponent,
  EditConditionComponent,
  UserListComponent,
  DeviceDetailsComponent,
  UserHomeComponent,
  AddReviewComponent
];
