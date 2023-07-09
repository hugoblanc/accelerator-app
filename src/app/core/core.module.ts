import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySelectionCardComponent } from './components/category-selection-card/category-selection-card.component';
import { PromptCardComponent } from './components/prompt-card/prompt-card.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    CategorySelectionCardComponent,
    PromptCardComponent,
    LoaderComponent
  ],
    exports: [
        CategorySelectionCardComponent,
        PromptCardComponent,
        LoaderComponent
    ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    RouterModule
  ]
})
export class CoreModule { }
