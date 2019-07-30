import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as Material from "@angular/material";
import {MatDialogModule,MatDialog,MatDialogRef} from "@angular/material/dialog";

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
    Material.MatTableModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatFormFieldModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTooltipModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule
  ],
  exports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatSidenavModule,
    Material.MatCardModule,
    Material.MatListModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatTableModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatFormFieldModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTooltipModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    MatDialogModule
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
  ]
})
export class MaterialModule {}
