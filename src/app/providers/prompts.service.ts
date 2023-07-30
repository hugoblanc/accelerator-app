import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PromptDto, PromptToEditDto } from './dto/prompt.dto';

@Injectable({
  providedIn: 'root'
})
export class PromptsService {
  constructor(private readonly http: HttpClient) { }

  getPrompts() {
    return this.http.get<PromptDto[]>('/prompts');
  }
  getPromptById(promptId: string) {
    return this.http.get<PromptDto>('/prompts/id/' + promptId);
  }

  getPromptToEdit(promptId: string) {
    return this.http.get<PromptToEditDto>('/prompts/to-edit/' + promptId);
  }
  getPromptByIds(promptIds: string[]) {
    return this.http.post<PromptDto[]>('/prompts/ids', promptIds);
  }
  getMyPrompts() {
    return this.http.get<PromptDto[]>('/prompts/myPrompts');
  }
  getTeamPrompts(teamId: string) {
    return this.http.get<PromptDto[]>('/prompts/team/' + teamId);
  }
  deletePrompt(promptId: string) {
    return this.http.delete('/prompts/' + promptId);
  }

  forkPrompt(promptId: string) {
    return this.http.post('/prompts/fork/' + promptId, null);
  }
}
