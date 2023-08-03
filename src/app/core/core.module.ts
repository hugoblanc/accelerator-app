import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from '@angular/router';
import {CategorySelectionCardComponent} from './components/category-selection-card/category-selection-card.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PromptCardComponent} from './components/prompt-card/prompt-card.component';
import {ApiUrlInterceptor} from './interceptors/api-url.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SkeletonLoaderComponent} from './components/skeleton-loader/skeleton-loader.component';
import {NoDataComponent} from './components/no-data/no-data.component';
import {MatOptionModule} from "@angular/material/core";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    CategorySelectionCardComponent,
    PromptCardComponent,
    LoaderComponent,
    SkeletonLoaderComponent,
    NoDataComponent,
    ConfirmDialogComponent
  ],
    exports: [
        CategorySelectionCardComponent,
        PromptCardComponent,
        LoaderComponent,
        SkeletonLoaderComponent,
        NoDataComponent
    ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    RouterModule,
    MatOptionModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}]
})
export class CoreModule {
}
