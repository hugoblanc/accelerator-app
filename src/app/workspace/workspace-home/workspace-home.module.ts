import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkspaceHomeComponent} from "./workspace-home.component";
import {WorkspaceHomeRoutingModule} from "./workspace-home-routing.module";
import { TeamsComponent } from './teams/teams.component';
import { MembersComponent } from './members/members.component';


@NgModule({
  declarations: [
    WorkspaceHomeComponent,
    TeamsComponent,
    MembersComponent
  ],
  imports: [
    CommonModule,
    WorkspaceHomeRoutingModule
  ]
})
export class WorkspaceHomeModule {
}
