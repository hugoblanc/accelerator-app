import { Component } from '@angular/core';
import {categoriesList, CategoryDto} from "../providers/dto/category.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  categoriesList: CategoryDto[] = categoriesList;

  constructor(private router: Router) {
  }

  categorySelected(category: CategoryDto) {
    localStorage.setItem('onboarding', 'true');
    this.router.navigate(['/gallery']).then();
  }
}
