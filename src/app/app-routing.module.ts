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
import { AuthGuard } from './shared/auth.guard';
import { UserTypeGuard } from './shared/user-type.guard';
import { NormalUserGuard } from './shared/normal-user.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "add-device", component: AddDeviceComponent,canActivate:[AuthGuard,UserTypeGuard]},
  { path: "assign-device", component: AssignDeviceComponent,canActivate:[AuthGuard,UserTypeGuard]},
  { path: "return-device", component: ReturnDeviceComponent,canActivate:[AuthGuard]},
  { path: "toolbar", component: ToolbarComponent, canActivate: [AuthGuard]},
  { path: "edit-condition", component: EditConditionComponent,canActivate:[AuthGuard]},
  { path: "user-list", component: UserListComponent ,canActivate:[AuthGuard,UserTypeGuard]},
  { path: "device-list/:deviceKey", component: DeviceDetailsComponent,canActivate:[AuthGuard,UserTypeGuard]},
  { path: "device-list", component: DeviceListComponent,canActivate:[AuthGuard,UserTypeGuard]},
  { path: "user-home", component: UserHomeComponent,canActivate:[AuthGuard,NormalUserGuard]},
  { path: "add-review", component: AddReviewComponent,canActivate:[AuthGuard]},
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
