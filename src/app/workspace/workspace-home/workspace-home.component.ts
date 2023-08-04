import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from "../../providers/workspace.service";
import {TeamService} from "../../providers/team.service";

@Component({
  selector: 'app-workspace-home',
  templateUrl: './workspace-home.component.html',
  styleUrls: ['./workspace-home.component.scss']
})
export class WorkspaceHomeComponent implements OnInit {

  membersCount: number | undefined;
  countIsLoading: boolean = false;

  constructor(public workspaceService: WorkspaceService,
              public teamService: TeamService) {
  }

  ngOnInit(): void {
  }

  getMembersCount(): number {
    if (this.membersCount === undefined && !this.countIsLoading) {
      this.countIsLoading = true;
      this.workspaceService.getMembersCount().subscribe((count) => {
        this.membersCount = count;
        this.countIsLoading = false;
      });
    }
    return this.membersCount || 0;
  }
}
