import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from '@angular/router';
import { CategorySelectionCardComponent } from './components/category-selection-card/category-selection-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PromptCardComponent } from './components/prompt-card/prompt-card.component';
import { appInitializerProviders } from './initializer/app.initializer';
import { ApiUrlInterceptor } from './interceptors/api-url.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



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
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true }]
})
export class CoreModule { }
