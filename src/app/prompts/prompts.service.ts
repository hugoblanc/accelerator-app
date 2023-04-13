import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptsService {
  constructor(private readonly http: HttpClient) { }

  getPrompts() {
    return this.http.get('https://api.github.com/users');
  }
}
