import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, debounceTime, filter, startWith, switchMap } from 'rxjs';
import { CategoryService } from '../providers/category.service';
import { CategoryDto } from '../providers/dto/category.dto';
import { ContribPromptService } from './contrib-prompt.service';
import { GPTModel } from './gtp-model.enum';
import { UserService } from "../providers/user.service";
import { PromptDto, PromptToEditDto } from "../providers/dto/prompt.dto";
import { PromptsService } from '../providers/prompts.service';
import { languagesList } from "../providers/dto/languages";
import { CreatePromptDto } from '../providers/dto/create.prompt.dto';

interface CreatePromptForm {
  text: FormControl<string>;
  description: FormControl<string>;
  model: FormControl<GPTModel>;
  name: FormControl<string>;
  categories: FormControl<any[]>;
  opened: FormControl<boolean>;
  lang: FormControl<string>
}



@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categories$!: Observable<CategoryDto[]>;

  categoryCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  categories: { name: string, id?: string }[] = [];

  createPromptForms = new FormGroup<CreatePromptForm>({
    text: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    model: new FormControl(GPTModel.GPT35Turbo, { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categories: new FormControl<any[]>([], { nonNullable: true, validators: [Validators.required] }),
    opened: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
    lang: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  get modelEnum(): typeof GPTModel {
    return GPTModel;
  }

  languagesList = languagesList;
  isEditing = false;

  constructor(private readonly contribPrompt: ContribPromptService,
    private readonly promptService: PromptsService,
    private readonly snackBar: MatSnackBar,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap
      .subscribe(params => {
        const promptId = params.get('promptId');
        if (promptId) {
          this.isEditing = true;
          this.promptService.getPromptToEdit(promptId).subscribe((prompt: PromptToEditDto) => {
            this.createPromptForms.controls.text.setValue(prompt.text);
            this.createPromptForms.controls.description.setValue(prompt.description);
            console.log(prompt.model);
            this.createPromptForms.controls.model.setValue(prompt.model);
            this.createPromptForms.controls.name.setValue(prompt.name);
            this.createPromptForms.controls.lang.setValue(prompt.lang);
            this.createPromptForms.controls.categories.setValue(prompt.categories.map(category => category.id));
            this.categories = [...prompt.categories];
            this.createPromptForms.controls.opened.setValue(prompt.opened);
          });
        }
      });

    this.categories$ = this.categoryCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        switchMap(value => this.categoryService.getCategories(value))
      );
  }

  save() {

    const { text, name, description, model, opened, lang } = this.createPromptForms.value;
    const categoryIds = this.categories.map(category => category.id).filter(id => id !== undefined) as string[];
    const categoryNamesToCreate = this.categories.filter(category => category.id === undefined).map(category => category.name);

    if (!text || !name || !categoryIds || !description || !model || opened == null || !lang) return;

    const data = { text, name, description, categoryIds, categoryNamesToCreate, model, opened, lang };

    if (this.isEditing) {
      this.saveEdition(data);
    } else {
      this.createPrompt(data);
    }
  }
  private saveEdition(creationData: CreatePromptDto) {
    const promptId = this.route.snapshot.paramMap.get('promptId') ?? '';
    const editionData = { ...creationData, id: promptId };

    this.contribPrompt.editPrompt(editionData).subscribe((prompt) => {
      this.snackBar.open("Prompt created!", 'Close', { duration: 2000 });
      this.resetAndNavigate(promptId);
    });

  }

  private createPrompt(creationData: CreatePromptDto) {
    this.contribPrompt.createPrompt(creationData).subscribe((prompt) => {
      this.snackBar.open("Prompt created!", 'Close', { duration: 2000 });
      this.resetAndNavigate((prompt as any).id);
    });
  }

  private resetAndNavigate(promptId: string) {
    this.categories = [];
    this.myForm.resetForm();
    this.router.navigate(['/prompts', promptId]).then();
    this.userService.setPromptList() // refresh the user prompt list
  }

  displayCategory(category: any) {
    return category?.name;
  }

  remove(index: number): void {
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.categories.push({ name: value });
    }

    event.chipInput!.clear();
    this.categoryCtrl.setValue('');
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.value as any);
    this.categoryCtrl.setValue('');
  }

}
