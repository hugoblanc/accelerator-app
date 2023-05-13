import { Component } from '@angular/core';
import {categoriesList, CategoryDto} from "../providers/dto/category.dto";
import {PromptDto, promptsList} from "../providers/dto/prompt.dto";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  searchInput: string = '';
  category: CategoryDto | undefined;

  protected readonly categoriesList: CategoryDto[] = categoriesList;

  protected readonly promptsList = promptsList;

  isLoading: boolean = false;

  userList: string[] = [];

  constructor() {
    this.userList = JSON.parse(localStorage.getItem('promptList') || '[]');

  }

  search() {
    console.log('searching for ' + this.searchInput);
  }

  addToList(prompt: PromptDto) {
    if (this.userList && prompt && this.userList.findIndex((id) => id === prompt.id) === -1) {
        this.userList.push(prompt.id);
        localStorage.setItem('promptList', JSON.stringify(this.userList));
        console.log(this.userList);
    }
  }

  isInList(prompt: PromptDto): boolean {
    return this.userList.findIndex((id) => id === prompt.id) !== -1;
  }



}
