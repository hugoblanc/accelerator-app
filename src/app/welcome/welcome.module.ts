import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import {CoreModule} from "../core/core.module";
import {WelcomeRoutingModule} from "./welcome-routing.module";



@NgModule({
  declarations: [
    WelcomeComponent
  ],
  exports: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
