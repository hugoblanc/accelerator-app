import { Component, OnInit } from '@angular/core';
import { PromptsService } from './prompts.service';
import { Observable } from 'rxjs';
import { PromptDto } from './prompt.dto';

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.scss']
})
export class PromptsComponent implements OnInit {

  prompts$!: Observable<PromptDto[]>;

  constructor(private readonly promptsService: PromptsService) { }
  ngOnInit(): void {
    this.prompts$ = this.promptsService.getPrompts();
  }

}
