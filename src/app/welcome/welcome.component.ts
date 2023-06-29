import { Component, OnInit } from '@angular/core';
import { CategoryDto } from "../providers/dto/category.dto";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CategoryService } from "../providers/category.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  categories$!: Observable<CategoryDto[]>;

  constructor(private router: Router,
    private readonly categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

  categorySelected(category: CategoryDto) {
    localStorage.setItem('onboarding', 'true');
    this.router.navigate(['/gallery/' + category.id]);
  }
}
