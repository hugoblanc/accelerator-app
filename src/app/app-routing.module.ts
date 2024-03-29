import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'gallery', pathMatch: 'full' },

  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },

  { path: 'signup', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) },

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  { path: 'prompts', loadChildren: () => import('./prompts/prompts.module').then(m => m.PromptsModule) },

  { path: 'contribute', loadChildren: () => import('./contribute/contribute.module').then(m => m.ContributeModule) },

  {
    path: 'contribute/edit/:promptId',
    loadChildren: () => import('./contribute/contribute.module').then(m => m.ContributeModule)
  },
  {
    path: 'contribute/edit/:promptId/:mode',
    loadChildren: () => import('./contribute/contribute.module').then(m => m.ContributeModule)
  },
  {
    path: 'contribute/teamId/:teamId',
    loadChildren: () => import('./contribute/contribute.module').then(m => m.ContributeModule)
  },

  { path: 'gallery', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule) },

  { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },

  {
    path: 'workspace', loadChildren: () => import('./workspace/workspace.module').then(m => m.WorkspaceModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
