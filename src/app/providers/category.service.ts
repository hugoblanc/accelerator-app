import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CategoryDto } from './dto/category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http: HttpClient) { }

  getCategories(name?: string | null) {
    const options = name ? { params: { name } } : {};
    return this.http.get<CategoryDto[]>(environment.apiUrl + '/categories', options);
  }

  createCategory(name: string) {
    return this.http.post(environment.apiUrl + '/categories', { name });
  }
}
