import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceCreateComponent } from "./workspace-create/workspace-create.component";
import { WorkspaceHomeComponent } from "./workspace-home/workspace-home.component";
import { WorkspaceComponent } from './workspace.component';

const routes: Routes = [
  {
    path: '', component: WorkspaceComponent, children: [
      { path: '', component: WorkspaceHomeComponent },
      { path: 'create', component: WorkspaceCreateComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {
}
