import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkspaceHomeComponent} from "./workspace-home.component";
import {WorkspaceHomeRoutingModule} from "./workspace-home-routing.module";
import { TeamsComponent } from './teams/teams.component';
import { MembersComponent } from './members/members.component';
import { TeamsTableComponent } from './teams/teams-table/teams-table.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    WorkspaceHomeComponent,
    TeamsComponent,
    MembersComponent,
    TeamsTableComponent
  ],
  imports: [
    CommonModule,
    WorkspaceHomeRoutingModule,
    MatTableModule
  ]
})
export class WorkspaceHomeModule {
}
