import { Injectable } from '@angular/core';
import {WorkspaceDto} from "./dto/workspace.dto";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  currentWorkspace: WorkspaceDto | undefined;

  constructor() {
    // this.currentWorkspace = new WorkspaceDto();
    // this.currentWorkspace.id = '534564112132a1zeaz1e32az1e';
    // this.currentWorkspace.name = 'My Workspace';
  }
}
