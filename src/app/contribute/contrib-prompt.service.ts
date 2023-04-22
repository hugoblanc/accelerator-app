import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreatePromptDto } from '../providers/dto/create.prompt.dto';

@Injectable({
  providedIn: 'root'
})
export class ContribPromptService {

  constructor(private readonly http: HttpClient) { }

  createPrompt(createPrompt: CreatePromptDto) {
    return this.http.post(environment.apiUrl + '/prompts', createPrompt);
  }
}
