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
    constructor(public workspaceService: WorkspaceService,
                public teamService: TeamService) { }

    ngOnInit(): void {
      this.getMembersCount();
    }

    getMembersCount() {
      this.workspaceService.getMembers().subscribe((members) => {
        this.membersCount = members.length;
      });
    }

}
