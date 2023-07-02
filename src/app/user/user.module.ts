import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserCreditsCardComponent } from './components/user-credits-card/user-credits-card.component';
import { LogoutComponent } from './components/logout/logout.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
    declarations: [
        UserCardComponent,
        UserCreditsCardComponent,
        LogoutComponent
    ],
  exports: [
    UserCardComponent,
    UserCreditsCardComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class UserModule { }
