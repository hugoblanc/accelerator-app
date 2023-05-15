import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {CoreModule} from "../core/core.module";
import {PromptsModule} from "../prompts/prompts.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    PromptsModule
  ]
})
export class HomeModule { }
