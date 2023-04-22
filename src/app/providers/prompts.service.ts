import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PromptDto } from './dto/prompt.dto';

@Injectable({
  providedIn: 'root'
})
export class PromptsService {


  constructor(private readonly http: HttpClient) { }

  getPrompts() {
    return this.http.get<PromptDto[]>(environment.apiUrl + '/prompts');
  }
  getPromptById(promptId: unknown) {
    return this.http.get<PromptDto>(environment.apiUrl + '/prompts/' + promptId);
  }
}
