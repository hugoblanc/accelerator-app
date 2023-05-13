import { Component } from '@angular/core';
import {CategoryDto} from "../providers/dto/category.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  categoriesList: CategoryDto[] = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
    { id: '3', name: 'Category 3' },
    { id: '4', name: 'Category 4' },
  ];

  constructor(private router: Router) {
  }

  categorySelected(category: CategoryDto) {
    localStorage.setItem('onboarding', 'true');
    this.router.navigate(['/home']).then();
  }
}
