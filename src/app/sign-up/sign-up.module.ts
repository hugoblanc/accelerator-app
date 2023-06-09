import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {SignUpRoutingModule} from "./sign-up-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    SignUpRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class SignUpModule { }
