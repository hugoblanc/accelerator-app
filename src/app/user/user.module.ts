import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserCreditsCardComponent } from './components/user-credits-card/user-credits-card.component';
import { LogoutComponent } from './components/logout/logout.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import { UserPromptsListComponent } from './components/user-prompts-list/user-prompts-list.component';
import {CoreModule} from "../core/core.module";



@NgModule({
    declarations: [
        UserCardComponent,
        UserCreditsCardComponent,
        LogoutComponent,
        UserPromptsListComponent
    ],
  exports: [
    UserCardComponent,
    UserCreditsCardComponent,
    LogoutComponent,
    UserPromptsListComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        CoreModule
    ]
})
export class UserModule { }
