import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromptsComponent } from './prompts.component';
import { UseComponent } from './use/use.component';
import { ChatComponent } from './chat/chat.component';
import { SessionInitGuard } from './chat/session-init.guard';

const routes: Routes = [
  { path: '', component: PromptsComponent },
  { path: 'chat', component: ChatComponent, canActivate: [SessionInitGuard] },
  { path: ':promptId', component: UseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromptsRoutingModule { }
