import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkspaceRoutingModule} from "./workspace-routing.module";
import { WorkspaceCreateComponent } from './workspace-create/workspace-create.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { WorkspaceHomeComponent } from './workspace-home/workspace-home.component';



@NgModule({
  declarations: [
    WorkspaceCreateComponent,
    WorkspaceHomeComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class WorkspaceModule { }
