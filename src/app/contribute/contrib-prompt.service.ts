import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePromptDto, EditPromptDto } from '../providers/dto/create.prompt.dto';

@Injectable({
  providedIn: 'root'
})
export class ContribPromptService {

  constructor(private readonly http: HttpClient) { }

  createPrompt(createPrompt: CreatePromptDto) {
    return this.http.post('/prompts', createPrompt);
  }

  editPrompt(editPrompt: EditPromptDto) {
    return this.http.put('/prompts/edit', editPrompt);
  }
}
