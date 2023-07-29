import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamsComponent} from "./teams/teams.component";
import {MembersComponent} from "./members/members.component";

const routes: Routes = [
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'teams', component: TeamsComponent },
  { path: 'members', component: MembersComponent },
  // { path: 'prompts', component: PromptsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceHomeRoutingModule {
}
