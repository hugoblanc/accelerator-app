import {Injectable} from '@angular/core';
import {WorkspaceDto} from "./dto/workspace.dto";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MemberDto} from "./dto/member.dto";
import {InviteMemberDto} from "./dto/invite-member.dto";
import {TeamService} from "./team.service";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  currentWorkspace: WorkspaceDto | undefined;

  currentUserWorkspaces: WorkspaceDto[] = [];
  public workspaceListIsLoading: boolean = false;

  constructor(private http: HttpClient,
              private teamService: TeamService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  public initWorkspace() {
    this.getMyWorkspaces();
    this.teamService.getWorkspaceTeams();
  }

  public changeWorkspace(workspace: WorkspaceDto) {
    this.setCurrentWorkspace(workspace);
    window.location.reload(); // voir comment faire mieux plus tard ;) (pour recharger la page)
  }

  private setCurrentWorkspace(workspace: WorkspaceDto) {
    this.currentWorkspace = workspace;
    localStorage.setItem('currentWorkspaceId', workspace.id);
  }

  public createWorkspace(name: string) {
    return this.http.post<WorkspaceDto>('/workspaces', {name: name}).subscribe(
      (workspace) => this.workSpaceCreationSuccess(workspace)
    );
  }

  private workSpaceCreationSuccess(workspace: WorkspaceDto) {
    this.currentWorkspace = workspace;
    this.snackBar.open("Workspace created successfully", 'Close', { duration: 2000 });
    this.router.navigate(['/workspace/home']).then();
  }

  public getMyWorkspaces() {
    this.workspaceListIsLoading = true;
    this.http.get<WorkspaceDto[]>('/workspaces/mine').subscribe(
      (result) => this.getMyWorkspacesSuccess(result),
      () => this.workspaceListIsLoading = false
    );
  }

  public getMembers() {
    if (this.currentWorkspace) {
      return this.http.get<MemberDto[]>('/workspaces/members');
    } else {
      return of();
    }
  }

  public getMembersCount() {
    return this.http.get<number>('/workspaces/members/count');
  }

  private getMyWorkspacesSuccess(workspaces: WorkspaceDto[]) {
    this.currentUserWorkspaces = workspaces;
    if(workspaces.length > 0) {
      if (localStorage.getItem('currentWorkspaceId')) {
        this.currentWorkspace = workspaces.find(workspace => workspace.id === localStorage.getItem('currentWorkspaceId'));
      } else {
        this.setCurrentWorkspace(workspaces[0])
      }
    }
    this.workspaceListIsLoading = false;
  }

  public inviteMember(inviteMember: InviteMemberDto) {
    return this.http.put('/workspaces/invite', inviteMember);
  }

  public removeMember(memberId: string) {
    return this.http.delete('/workspaces/members/' + memberId);
  }
}
