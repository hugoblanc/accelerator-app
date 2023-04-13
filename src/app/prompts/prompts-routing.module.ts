import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromptsComponent } from './prompts.component';
import { UseComponent } from './use/use.component';

const routes: Routes = [
  { path: '', component: PromptsComponent },
  { path: ':promptId', component: UseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromptsRoutingModule { }
