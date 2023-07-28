import { Injectable } from '@angular/core';
import {WorkspaceDto} from "./dto/workspace.dto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  currentWorkspace: WorkspaceDto | undefined;

  constructor(private http: HttpClient) {
    // this.currentWorkspace = new WorkspaceDto();
    // this.currentWorkspace.id = '534564112132a1zeaz1e32az1e';
    // this.currentWorkspace.name = 'My Workspace';
  }

  public createWorkspace(name: string): Observable<WorkspaceDto> {
    return this.http.post<WorkspaceDto>('/workspaces', {name});
  }
}
