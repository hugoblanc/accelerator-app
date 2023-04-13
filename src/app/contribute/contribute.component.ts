import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContribPromptService } from './contrib-prompt.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {

  createPromptForms = this.fb.group({
    text: ['', Validators.required],
    name: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly contribPrompt: ContribPromptService, private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  savePrompt() {
    const { text, name } = this.createPromptForms.value;
    if (!text || !name) return;

    this.contribPrompt.createPrompt(text, name).subscribe(() => {
      this.createPromptForms.reset();
      this.createPromptForms.markAsPristine();
      console.log("Prompt created!");
      this.snackBar.open("Prompt created!", "Close", { duration: 2000 });
    });
  }

}
