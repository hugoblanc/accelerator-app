import {Component, Input} from '@angular/core';
import {CategoryDto} from "../../../providers/dto/category.dto";

@Component({
  selector: 'app-category-selection-card',
  templateUrl: './category-selection-card.component.html',
  styleUrls: ['./category-selection-card.component.scss']
})
export class CategorySelectionCardComponent {

  @Input() category: CategoryDto | undefined;

  constructor() {
  }
}
