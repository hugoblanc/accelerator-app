import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'prompts', pathMatch: 'full' },
  { path: 'prompts', loadChildren: () => import('./prompts/prompts.module').then(m => m.PromptsModule) },

  { path: 'contribute', loadChildren: () => import('./contribute/contribute.module').then(m => m.ContributeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
