import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { ChatService } from '../../providers/chat.service';
import { PromptDto, VariableType } from '../../providers/dto/prompt.dto';
import { PromptsService } from '../../providers/prompts.service';
import {UserService} from "../../providers/user.service";

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
  @Input() set promptId(value: string) {
    this._promptId = value;
    this.getPrompt();
  }

  _promptId!: string;
  usePromptForms!: FormGroup<UsePromptForm>;
  preview: string = '';
  initialPromptText: string = '';
  prompt!: PromptDto;
  private routeSubscription!: Subscription;

  get isSessionInitialized(): boolean {
    return this.chatService.isSessionInitialized;
  }

  constructor(
    private readonly promptsService: PromptsService,
    public readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly chatService: ChatService) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const promptId = params.get('promptId');
      if (promptId) {
        this._promptId = promptId;
        this.getPrompt();
      } else if (this._promptId) {
        this.getPrompt();
      }
    });

  }

  getPrompt() {
    this.promptsService.getPromptById(this._promptId).subscribe((prompt) => this.initForm(prompt));
  }

  ngOnDestroy(): void {
    this.chatService.cleanSession();
  }

  initForm(prompt: PromptDto) {
    this.prompt = prompt;
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
    this.chatService.usePrompt(this.usePromptForms.value, this.preview, this._promptId).subscribe();
  }
}
