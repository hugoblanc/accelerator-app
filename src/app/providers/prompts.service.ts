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
    return this.http.get<PromptDto>(environment.apiUrl + '/prompts/id/' + promptId);
  }
  getPromptByIds(promptIds: unknown) {
    return this.http.post<PromptDto[]>(environment.apiUrl + '/prompts/ids', promptIds);
  }
  getMyPrompts() {
    return this.http.get<PromptDto[]>(environment.apiUrl + '/prompts/myPrompts');
  }
  deletePrompt(promptId: string) {
    return this.http.delete(environment.apiUrl + '/prompts/' + promptId);
  }

  forkPrompt(promptId: string) {
    return this.http.post(environment.apiUrl + '/prompts/fork/' + promptId, null);
  }
}
