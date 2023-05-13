import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryDto} from "../../../providers/dto/category.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-selection-card',
  templateUrl: './category-selection-card.component.html',
  styleUrls: ['./category-selection-card.component.scss']
})
export class CategorySelectionCardComponent {

  @Input() category: CategoryDto | undefined;
  @Output() selected = new EventEmitter<CategoryDto>();

  constructor() {
  }

  public select() {
    this.selected.emit(this.category);
  }
}
