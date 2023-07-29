import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from "../../providers/workspace.service";

@Component({
  selector: 'app-workspace-home',
  templateUrl: './workspace-home.component.html',
  styleUrls: ['./workspace-home.component.scss']
})
export class WorkspaceHomeComponent implements OnInit {

    constructor(public workspaceService: WorkspaceService) { }

    ngOnInit(): void {
    }

}
