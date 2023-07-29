import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkspaceComponent} from "./workspace.component";
import {WorkspaceCreateComponent} from "./workspace-create/workspace-create.component";
import {WorkspaceHomeComponent} from "./workspace-home/workspace-home.component";

const routes: Routes = [
  { path: '', component: WorkspaceComponent },
  { path: 'create', component: WorkspaceCreateComponent },
  { path: 'home', component: WorkspaceHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {
}
