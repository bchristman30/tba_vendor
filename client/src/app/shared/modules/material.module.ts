import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule, MatChipsModule, MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule} from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatListModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatSliderModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatListModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatSliderModule
  ]
})
export class MaterialModule {
}
