import { Component, OnInit } from '@angular/core';
import { PromptsService } from '../../providers/prompts.service';
import { Observable, map, mergeMap } from 'rxjs';
import { PromptDto, VariableType } from '../../providers/dto/prompt.dto';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../providers/chat.service';

type VariableArray = FormArray<FormGroup<{ name: FormControl<string>, value: FormControl<string>, type: FormControl<VariableType> }>>;
interface UsePromptForm {
  text: FormControl<string>;
  variables?: VariableArray;
}


@Component({
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.scss']
})
export class UseComponent implements OnInit {


  prompt$!: Observable<PromptDto>;

  usePromptForms!: FormGroup<UsePromptForm>;

  result: string = '';

  preview: string = '';
  isLoading = false;
  constructor(private readonly promptsService: PromptsService, private readonly route: ActivatedRoute, private readonly chatService: ChatService, private readonly router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('promptId')),
      mergeMap(promptId => this.promptsService.getPromptById(promptId))
    ).subscribe((prompt: PromptDto) => {
      const variables: VariableArray = new FormArray(
        prompt.promptVariables.map((variable) =>
          new FormGroup(
            {
              name: new FormControl(variable.value, { nonNullable: true }),
              value: new FormControl(variable.value, { nonNullable: true }),
              type: new FormControl(variable.type, { nonNullable: true })
            }
          ))
      );
      this.preview = prompt.text;
      this.usePromptForms = new FormGroup({ text: new FormControl(prompt.text, { nonNullable: true }), variables }) as any;
      this.initVariableListener(variables);
    });
  }

  initVariableListener(variables: VariableArray) {
    variables.valueChanges.subscribe((value) => this.updatePreview(value));
  }

  private updatePreview(value: Partial<{
    name: string;
    value: string;
    type: VariableType;
  }>[]) {
    this.preview = this.usePromptForms.value.text as string;
    value.forEach((variable) => {
      if (variable.type === VariableType.text) {
        this.preview = this.preview.replace(`text(${variable.name})`, variable.value as string);
      } else if (variable.type === VariableType.longText) {
        this.preview = this.preview.replace(`longText(${variable.name})`, variable.value as string);
      }
    });
  }


  startEngine() {
    this.isLoading = true;
    this.router.navigateByUrl('/prompts/chat');
    this.chatService.usePrompt(this.usePromptForms.value, this.preview).subscribe((boom) => {
      this.result = boom.result;
      this.isLoading = false;
    });
  }
}
