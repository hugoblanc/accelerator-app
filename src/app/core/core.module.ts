import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySelectionCardComponent } from './components/category-selection-card/category-selection-card.component';
import { PromptCardComponent } from './components/prompt-card/prompt-card.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
    declarations: [
        CategorySelectionCardComponent,
        PromptCardComponent
    ],
  exports: [
    CategorySelectionCardComponent,
    PromptCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CoreModule { }
