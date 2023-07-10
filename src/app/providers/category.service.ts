import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDto } from './dto/category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http: HttpClient) { }

  getCategories(name?: string | null) {
    const options = name ? { params: { name } } : {};
    return this.http.get<CategoryDto[]>('/categories', options);
  }

  createCategory(name: string) {
    return this.http.post('/categories', { name });
  }
}
