import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySelectionCardComponent } from './components/category-selection-card/category-selection-card.component';



@NgModule({
    declarations: [
        CategorySelectionCardComponent
    ],
    exports: [
        CategorySelectionCardComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CoreModule { }
