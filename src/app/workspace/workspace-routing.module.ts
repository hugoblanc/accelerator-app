import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkspaceCreateComponent} from "./workspace-create/workspace-create.component";
import {WorkspaceHomeComponent} from "./workspace-home/workspace-home.component";
import {WorkspaceComponent} from './workspace.component';
import {TeamsComponent} from "./workspace-home/teams/teams.component";
import {MembersComponent} from "./workspace-home/members/members.component";

const routes: Routes = [
  {path: 'create', component: WorkspaceCreateComponent},
  {
    path: 'home', component: WorkspaceHomeComponent, children: [
      {path: '', component: TeamsComponent},
      {path: 'teams', component: TeamsComponent},
      {path: 'members', component: MembersComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {
}
