import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorkspaceService} from "../../providers/workspace.service";

@Component({
  selector: 'app-workspace-create',
  templateUrl: './workspace-create.component.html',
  styleUrls: ['./workspace-create.component.scss']
})
export class WorkspaceCreateComponent implements OnInit {

  formGp!: FormGroup;

  constructor(private fb: FormBuilder, private workspaceService: WorkspaceService) { }

  ngOnInit(): void {
    this.formGp = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    this.workspaceService.createWorkspace(this.formGp.value.name);
  }

}
