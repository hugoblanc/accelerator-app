import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContributeRoutingModule } from './contribute-routing.module';
import { ContributeComponent } from './contribute.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CoreModule} from "../core/core.module";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    ContributeComponent
  ],
  imports: [
    CommonModule,
    ContributeRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    CoreModule,
    MatListModule
  ]
})
export class ContributeModule { }
