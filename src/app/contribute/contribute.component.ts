import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../providers/category.service';
import { CategoryDto } from '../providers/dto/category.dto';
import { ContribPromptService } from './contrib-prompt.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, debounceTime, merge, startWith, switchMap } from 'rxjs';

interface CreatePromptForm {
  text: FormControl<string>;
  name: FormControl<string>;
  categories: FormControl<any[]>;
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
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categories: new FormControl<any[]>([], { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private readonly contribPrompt: ContribPromptService, private readonly snackBar: MatSnackBar, private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        switchMap(value => this.categoryService.getCategories(value))
      );
  }

  savePrompt() {
    const { text, name } = this.createPromptForms.value;
    const categoryIds = this.categories.map(category => category.id).filter(id => id !== undefined) as string[];
    const categoryNamesToCreate = this.categories.filter(category => category.id === undefined).map(category => category.name);

    if (!text || !name || !categoryIds) return;

    this.contribPrompt.createPrompt({ text, name, categoryIds, categoryNamesToCreate }).subscribe(() => {
      this.categories = [];
      this.myForm.resetForm();
      this.snackBar.open("Prompt created!", "Close", { duration: 2000 });
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
    // this.fruitInput.nativeElement.value = '';
    this.categoryCtrl.setValue('');
  }

}
