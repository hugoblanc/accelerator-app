import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Router} from '@angular/router';
import {Observable, filter, map, mergeMap, take} from 'rxjs';
import {ChatService} from '../../providers/chat.service';
import {PromptDto, VariableType} from '../../providers/dto/prompt.dto';
import {PromptsService} from '../../providers/prompts.service';
import {subscribeToWorkflow} from "@angular/cli/src/command-builder/utilities/schematic-workflow";

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
export class UseComponent implements OnInit {

  @Input() set prompt(prompt: PromptDto) {
    this._prompt = prompt;
    this.initForm(this._prompt);
  }

  _prompt!: PromptDto;

  prompt$!: Observable<PromptDto>;
  usePromptForms!: FormGroup<UsePromptForm>;
  result: string = '';
  preview: string = '';
  initialPromptText: string = '';


  get promptId$(): Observable<string> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('promptId')),
      filter((promptId: string | null) => promptId !== null),
    ) as Observable<string>;
  }

  constructor(
    private readonly promptsService: PromptsService,
    private readonly route: ActivatedRoute,
    private readonly chatService: ChatService,
    private readonly router: Router) {
  }


  ngOnInit(): void {
    // if we get a prompt from the parent component, use it
    if (this.prompt) {
      this.initForm(this.prompt);
    } else { // otherwise, get the prompt from the route
      this.promptId$.pipe(
        mergeMap(promptId => this.promptsService.getPromptById(promptId))
      ).subscribe((prompt: PromptDto) => this.initForm(prompt));
    }

  }

  initForm(prompt: PromptDto) {
    if (prompt.promptVariables) {
      const variables: VariableArray = new FormArray(
        prompt.promptVariables.map((variable) =>
          new FormGroup(
            {
              key: new FormControl(variable.value, {nonNullable: true}),
              value: new FormControl(variable.value, {nonNullable: true}),
              type: new FormControl(variable.type, {nonNullable: true})
            }
          ))
      );

      this.preview = prompt.text;
      this.initialPromptText = prompt.text;
      this.usePromptForms = new FormGroup({variables}) as any;
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
    this.router.navigateByUrl('/prompts/chat');
    this.promptId$.pipe(
      take(1),
      mergeMap((promptId: string) => this.chatService.usePrompt(this.usePromptForms.value, this.preview, promptId))
    ).subscribe();
  }
}
