import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../providers/category.service';
import { ContribPromptService } from './contrib-prompt.service';

interface CreatePromptForm {
  text: FormControl<string>;
  name: FormControl<string>;
  categoryIds: FormControl<string[]>;
}

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {

  categories$ = this.categoryService.getCategories();

  createPromptForms = new FormGroup<CreatePromptForm>({
    text: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categoryIds: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private readonly fb: FormBuilder, private readonly contribPrompt: ContribPromptService, private readonly snackBar: MatSnackBar, private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  savePrompt() {
    const { text, name } = this.createPromptForms.value;
    if (!text || !name) return;

    this.contribPrompt.createPrompt(this.createPromptForms.getRawValue()).subscribe(() => {
      this.createPromptForms.reset();
      this.createPromptForms.markAsPristine();
      this.snackBar.open("Prompt created!", "Close", { duration: 2000 });
    });
  }

}
