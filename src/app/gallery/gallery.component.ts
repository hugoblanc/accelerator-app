import { Component, OnInit } from '@angular/core';
import { CategoryDto } from "../providers/dto/category.dto";
import { PromptDto } from "../providers/dto/prompt.dto";
import { Observable } from "rxjs";
import { PromptsService } from "../providers/prompts.service";
import { CategoryService } from "../providers/category.service";
import { MatSelectChange } from "@angular/material/select";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  searchInput: string = '';
  categorySelectedId: string | undefined = undefined;

  userList: string[] = [];

  prompts$!: Observable<PromptDto[]>;
  categories$!: Observable<CategoryDto[]>;

  filteredPrompts: PromptDto[] = [];



  constructor(private route: ActivatedRoute,
    private readonly promptsService: PromptsService,
    private readonly categoryService: CategoryService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const categoryId = params.get('categoryId');
      if (categoryId) {
        this.categorySelectedId = categoryId;
      }
    });
  }

  ngOnInit(): void {
    this.prompts$ = this.promptsService.getPrompts();
    this.categories$ = this.categoryService.getCategories();
    this.userList = JSON.parse(localStorage.getItem('promptList') || '[]');
    this.loadFilteredPrompt();
  }

  categorySelect(event: MatSelectChange) {
    this.loadFilteredPrompt();
  }

  loadFilteredPrompt() {
    this.prompts$.subscribe(prompts => {
      const isSearchEmpty = this.searchInput === '';
      if (isSearchEmpty) {
        this.filteredPrompts = prompts;
      } else {
        const lowerCaseSearch = this.searchInput.toLowerCase();
        this.filteredPrompts = prompts.filter(prompt =>
          prompt.name.toLowerCase().includes(lowerCaseSearch) ||
          prompt.text.toLowerCase().includes(lowerCaseSearch)
        );
      }
      if (this.categorySelectedId) {
        this.filteredPrompts = this.filteredPrompts.filter(prompt => prompt.categories?.findIndex(item => item.id === this.categorySelectedId) != -1);
      }
    });
  }


  addToList(prompt: PromptDto) {
    if (this.userList && prompt && this.userList.findIndex((id) => id === prompt.id) === -1) {
      this.userList.push(prompt.id);
      localStorage.setItem('promptList', JSON.stringify(this.userList));
    }
  }

  removeFromList(prompt: PromptDto) {
    if (this.userList && prompt) {
      const index = this.userList.findIndex((id) => id === prompt.id);
      if (index !== -1) {
        this.userList.splice(index, 1);
        localStorage.setItem('promptList', JSON.stringify(this.userList));
      }
    }
  }

  isInList(prompt: PromptDto): boolean {
    return this.userList.findIndex((id) => id === prompt.id) !== -1;
  }


}
