import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { AssignDeviceComponent } from './assign-device/assign-device.component';
import { ReturnDeviceComponent } from './return-device/return-device.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DeviceListComponent } from './device-list/device-list.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'add-user',component:AddUserComponent},
  {path:'user-home',component:UserHomeComponent},
  {path:'add-device',component:AddDeviceComponent},
  {path:'assign-device',component:AssignDeviceComponent},
  {path:'return-device',component:ReturnDeviceComponent},
  {path:'toolbar',component:ToolbarComponent},
  {path:'side-menu',component:SideMenuComponent},
  {path:'admin-home',component:AdminHomeComponent},
  {path:'device-list',component:DeviceListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,AddUserComponent,UserHomeComponent,AddDeviceComponent,
  AssignDeviceComponent,ReturnDeviceComponent,ToolbarComponent,SideMenuComponent,AdminHomeComponent,DeviceListComponent]