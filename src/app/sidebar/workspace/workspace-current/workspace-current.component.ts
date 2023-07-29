import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from "../../../providers/workspace.service";
import {WorkspaceDto} from "../../../providers/dto/workspace.dto";

@Component({
  selector: 'app-workspace-current',
  templateUrl: './workspace-current.component.html',
  styleUrls: ['./workspace-current.component.scss']
})
export class WorkspaceCurrentComponent implements OnInit {

  constructor(public workspaceService: WorkspaceService) {
  }

  ngOnInit(): void {
  }

  changeWorkSpace(workspace: WorkspaceDto): void {
    this.workspaceService.changeWorkspace(workspace);
  }

}
