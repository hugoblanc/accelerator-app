import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkspaceHomeComponent} from "./workspace-home.component";
import { TeamsComponent } from './teams/teams.component';
import { MembersComponent } from './members/members.component';
import { TeamsTableComponent } from './teams/teams-table/teams-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { MembersTableComponent } from './members/members-table/members-table.component';
import {CoreModule} from "../../core/core.module";
import { TeamCreateComponent } from './teams/team-create/team-create.component';


@NgModule({
  declarations: [
    WorkspaceHomeComponent,
    TeamsComponent,
    MembersComponent,
    TeamsTableComponent,
    MembersTableComponent,
    TeamCreateComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    RouterModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class WorkspaceHomeModule {
}
