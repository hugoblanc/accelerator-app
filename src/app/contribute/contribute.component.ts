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
import { PromptDto } from "../providers/dto/prompt.dto";
import { PromptsService } from '../providers/prompts.service';

interface CreatePromptForm {
  text: FormControl<string>;
  description: FormControl<string>;
  model: FormControl<GPTModel>;
  name: FormControl<string>;
  categories: FormControl<any[]>;
  opened: FormControl<boolean>;
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
    opened: new FormControl(false, { nonNullable: true, validators: [Validators.required] })
  });

  get modelEnum(): typeof GPTModel {
    return GPTModel;
  }

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
          this.promptService.getPromptById(promptId).subscribe((prompt: PromptDto) => {
            this.createPromptForms.controls.text.setValue(prompt.text);
            this.createPromptForms.controls.description.setValue(prompt.description);
            // this.createPromptForms.controls.model.setValue(prompt.model);
            this.createPromptForms.controls.name.setValue(prompt.name);
            // this.createPromptForms.controls.categories.setValue(prompt.categories);
            // this.createPromptForms.controls.opened.setValue(prompt.opened);
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

  savePrompt() {
    const { text, name, description, model, opened } = this.createPromptForms.value;
    const categoryIds = this.categories.map(category => category.id).filter(id => id !== undefined) as string[];
    const categoryNamesToCreate = this.categories.filter(category => category.id === undefined).map(category => category.name);

    if (!text || !name || !categoryIds || !description || !model || opened == null) return;

    this.contribPrompt.createPrompt({ text, name, description, categoryIds, categoryNamesToCreate, model, opened }).subscribe((prompt) => {
      this.categories = [];
      this.myForm.resetForm();
      this.snackBar.open("Prompt created!",'Close', {duration : 2000});
      this.router.navigate(['/prompts', (prompt as any).id]).then();
      this.userService.setPromptList() // refresh the user prompt list
    });
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
