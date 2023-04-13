import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromptsRoutingModule } from './prompts-routing.module';
import { PromptsComponent } from './prompts.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PromptsComponent
  ],
  imports: [
    CommonModule,
    PromptsRoutingModule,
    HttpClientModule
  ]
})
export class PromptsModule { }
