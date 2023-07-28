import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkspaceComponent} from "./workspace.component";
import {WorkspaceCreateComponent} from "./workspace-create/workspace-create.component";

const routes: Routes = [
  { path: '', component: WorkspaceComponent },
  { path: 'create', component: WorkspaceCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {
}
