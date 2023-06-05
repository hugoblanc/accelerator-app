import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';
import { CategoryService } from '../providers/category.service';
import { CategoryDto } from '../providers/dto/category.dto';
import { ContribPromptService } from './contrib-prompt.service';

interface CreatePromptForm {
  text: FormControl<string>;
  description: FormControl<string>;
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
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categories: new FormControl<any[]>([], { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private readonly contribPrompt: ContribPromptService, private readonly snackBar: MatSnackBar, private readonly categoryService: CategoryService, private readonly router: Router) { }

  ngOnInit(): void {
    this.categories$ = this.categoryCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        switchMap(value => this.categoryService.getCategories(value))
      );
  }

  savePrompt() {
    const { text, name, description } = this.createPromptForms.value;
    const categoryIds = this.categories.map(category => category.id).filter(id => !id) as string[];
    const categoryNamesToCreate = this.categories.filter(category => !!category.id).map(category => category.name);

    if (!text || !name || !categoryIds || !description) return;

    this.contribPrompt.createPrompt({ text, name, description, categoryIds, categoryNamesToCreate }).subscribe((prompt) => {
      this.categories = [];
      this.myForm.resetForm();
      const snackBarRef = this.snackBar.open("Prompt created!", "Use it", { duration: 10000 });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/prompts', (prompt as any).id]);
      });
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
