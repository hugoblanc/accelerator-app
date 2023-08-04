import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs';
import {ChatService} from '../../providers/chat.service';
import {PromptDto, VariableType} from '../../providers/dto/prompt.dto';
import {PromptsService} from '../../providers/prompts.service';
import {UserService} from "../../providers/user.service";
import {NoSubscriptionLeftService} from '../../providers/no-subscription-left.service';
import {ConfirmDialogComponent} from "../../core/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  usePromptForms!: FormGroup<UsePromptForm>;
  preview: string = '';
  initialPromptText: string = '';
  prompt!: PromptDto;

  constructor(
    private readonly promptsService: PromptsService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    public readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly noSubLeftService: NoSubscriptionLeftService,
    private readonly chatService: ChatService) {
  }

  _promptId!: string;

  @Input() set promptId(value: string) {
    this._promptId = value;
    this.getPrompt();
  }

  get isSessionInitialized(): boolean {
    return this.chatService.isSessionInitialized;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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
    this.promptsService.getPromptById(this._promptId)
      .subscribe((prompt) => this.initForm(prompt));
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
              value: new FormControl('', { nonNullable: true }),
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

  startEngine() {
    this.chatService.usePrompt(this.usePromptForms.value, this.preview, this._promptId)
      .pipe(catchError((err) => this.noSubLeftService.showToaster(err)))
      .subscribe();
  }

  delete() {
    this.dialog.open(ConfirmDialogComponent,
      {
        width: '400px',
        height: '200px',
      }).afterClosed().subscribe((result) => this.onConfirmDialogClosed(result));
  }

  onConfirmDialogClosed(result: boolean) {
    this.promptsService.deletePrompt(this.prompt.id).subscribe(
      () => this.onDeleteSuccess()
    );
  }

  onDeleteSuccess() {
    this.router.navigate(['/gallery']).then(
      () => {
        this.snackbar.open('Prompt deleted', 'OK', {duration: 3000});
        this.userService.setPromptList()
      }
    )
  }

  private updatePreview(value: Partial<{
    key: string;
    value: string;
    type: VariableType;
  }>[]) {
    this.preview = this.initialPromptText;
    value.forEach((variable) => {
      if (variable.type === VariableType.text) {
        this.preview = this.preview.replace(`text(${variable.key})`, this.getVariableValueViewComponent(variable.value, VariableType.text));
      } else if (variable.type === VariableType.longText) {
        this.preview = this.preview.replace(`longText(${variable.key})`, this.getVariableValueViewComponent(variable.value, VariableType.longText));
      }
    });
  }

  private getVariableValueViewComponent(value: any, type?: VariableType): string {
    if (type === VariableType.text) {
      return '<b class="text-indigo-500">' + value + '</b>';
    }
    if (type === VariableType.longText) {
      return '<i class="text-gray-500">' + value + '</i>';
    }
    return '<b class="text-indigo-500">' + value + '</b>';
  }


}
