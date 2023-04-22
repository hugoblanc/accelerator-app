import { Component, OnInit } from '@angular/core';
import { PromptsService } from '../../providers/prompts.service';
import { Observable, map, mergeMap } from 'rxjs';
import { PromptDto } from '../../providers/dto/prompt.dto';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

type VariableArray = FormArray<FormGroup<{ name: FormControl<string>, value: FormControl<string> }>>;
interface UsePromptForm {
  text: FormControl<string>;
  variables?: VariableArray;
}


@Component({
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.scss']
})
export class UseComponent implements OnInit {


  prompt$!: Observable<PromptDto>;

  usePromptForms!: FormGroup<UsePromptForm>;

  result: string = 'lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet';

  constructor(private readonly promptsService: PromptsService, private readonly route: ActivatedRoute, private readonly fb: FormBuilder) { }


  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('promptId')),
      mergeMap(promptId => this.promptsService.getPromptById(promptId))
    ).subscribe((prompt: PromptDto) => {
      const variables: VariableArray = new FormArray(prompt.promptVariables.map((variable) => new FormGroup({ name: new FormControl(variable.value, { nonNullable: true }), value: new FormControl(variable.value, { nonNullable: true }) })));
      console.log(JSON.stringify(variables['controls'][0].value));

      this.usePromptForms = new FormGroup({ text: new FormControl(prompt.text, { nonNullable: true }), variables }) as any;
    });
  }


  startEngine() {
    console.log(this.usePromptForms.value);
    this.promptsService.usePrompt(this.usePromptForms.value).subscribe((boom) => {
      console.log("Prompt used!");
      this.result = boom.result;
    });
  }



}
