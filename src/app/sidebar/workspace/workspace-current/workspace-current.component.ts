import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from "../../../providers/workspace.service";
import {UserService} from "../../../providers/user.service";
import {WorkspaceDto} from "../../../providers/dto/workspace.dto";

@Component({
  selector: 'app-workspace-current',
  templateUrl: './workspace-current.component.html',
  styleUrls: ['./workspace-current.component.scss']
})
export class WorkspaceCurrentComponent implements OnInit {

  isLoading = false;

  constructor(public workspaceService: WorkspaceService, public userService: UserService) {
  }

  ngOnInit(): void {
  }

  changeWorkSpace(workspace: WorkspaceDto): void {
    this.workspaceService.currentWorkspace = workspace;
  }

}