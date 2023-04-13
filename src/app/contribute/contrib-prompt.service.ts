import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContribPromptService {

  constructor(private readonly http: HttpClient) { }

  createPrompt(text: string, name: string) {
    return this.http.post(environment.apiUrl + '/prompts', { text, name });
  }
}
