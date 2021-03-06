import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatSidenavModule,
    Material.MatCardModule,
    Material.MatListModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatTableModule ,
    Material.MatDatepickerModule, 
    Material.MatNativeDateModule ,
    Material.MatFormFieldModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule
  ],
  exports:[
    CommonModule,
    Material.MatToolbarModule,
    Material.MatSidenavModule,
    Material.MatCardModule,
    Material.MatListModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatTableModule ,
    Material.MatDatepickerModule, 
    Material.MatNativeDateModule ,
    Material.MatFormFieldModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule
  ]
})
export class MaterialModule { }
