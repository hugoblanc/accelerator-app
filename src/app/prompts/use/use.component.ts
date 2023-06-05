import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from '../../providers/chat.service';
import { PromptDto, VariableType } from '../../providers/dto/prompt.dto';
import { PromptsService } from '../../providers/prompts.service';

type VariableArray = FormArray<FormGroup<{
  key: FormControl<string>,
  value: FormControl<string>,
  type: FormControl<VariableType>
}>>;

interface UsePromptForm {
  variables?: VariableArray;
}


@Component({
  selector: 'app-use',
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.scss']
})
export class UseComponent implements OnInit, OnDestroy {
  @Input() promptId?: string;

  prompt$!: Observable<PromptDto>;
  usePromptForms!: FormGroup<UsePromptForm>;
  preview: string = '';
  initialPromptText: string = '';

  get isSessionInitialized(): boolean {
    return this.chatService.isSessionInitialized;
  }

  get id(): string {
    const promptId = this.promptId ?? this.route.snapshot.paramMap.get('promptId');
    if (!promptId) {
      throw new Error('Prompt ID is not defined');
    }
    return promptId;
  }

  constructor(
    private readonly promptsService: PromptsService,
    private readonly route: ActivatedRoute,
    private readonly chatService: ChatService) {
  }

  ngOnInit(): void {
    this.promptsService.getPromptById(this.id).subscribe((prompt) => this.initForm(prompt));
  }


  ngOnDestroy(): void {
    this.chatService.cleanSession();
  }

  initForm(prompt: PromptDto) {
    if (prompt.promptVariables) {
      const variables: VariableArray = new FormArray(
        prompt.promptVariables.map((variable) =>
          new FormGroup(
            {
              key: new FormControl(variable.value, { nonNullable: true }),
              value: new FormControl(variable.value, { nonNullable: true }),
              type: new FormControl(variable.type, { nonNullable: true })
            }
          ))
      );
      this.preview = prompt.text;
      this.initialPromptText = prompt.text;
      this.usePromptForms = new FormGroup({ variables }) as any;
      this.initVariableListener(variables);
    }
  }

  initVariableListener(variables: VariableArray) {
    variables.valueChanges.subscribe((value) => this.updatePreview(value));
  }

  private updatePreview(value: Partial<{
    key: string;
    value: string;
    type: VariableType;
  }>[]) {
    this.preview = this.initialPromptText;
    value.forEach((variable) => {
      if (variable.type === VariableType.text) {
        this.preview = this.preview.replace(`text(${variable.key})`, variable.value as string);
      } else if (variable.type === VariableType.longText) {
        this.preview = this.preview.replace(`longText(${variable.key})`, variable.value as string);
      }
    });
  }


  startEngine() {
    this.chatService.usePrompt(this.usePromptForms.value, this.preview, this.id).subscribe();
  }
}
