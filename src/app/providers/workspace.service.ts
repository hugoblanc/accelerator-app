import { Injectable } from '@angular/core';
import {WorkspaceDto} from "./dto/workspace.dto";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  currentWorkspace: WorkspaceDto | undefined;

  constructor(private http: HttpClient, private router: Router) {
    this.currentWorkspace = new WorkspaceDto();
    this.currentWorkspace.id = '534564112132a1zeaz1e32az1e';
    this.currentWorkspace.name = 'My Workspace';
  }

  public createWorkspace(name: string) {
    // return this.http.post<WorkspaceDto>('/workspaces', {name}).subscribe(
    //   (workspace) => this.workSpaceCreationSuccess(workspace)
    // );
    const ws = new WorkspaceDto();
    ws.name = name;
    this.workSpaceCreationSuccess(ws);
  }

  private workSpaceCreationSuccess(workspace: WorkspaceDto) {
    this.currentWorkspace = workspace;
    this.router.navigate(['/workspace/home']).then();
  }
}
