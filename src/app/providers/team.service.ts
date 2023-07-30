import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TeamDto} from "./dto/team.dto";
import {WorkspaceService} from "./workspace.service";
import {MemberDto} from "./dto/member.dto";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl: string = '/teams'

  constructor(private http: HttpClient,
              private workspaceService: WorkspaceService) {
  }

  public getTeam(teamId: string) {
    return this.http.get<TeamDto>(this.apiUrl + '/' + teamId);
  }

  public getWorkspaceTeams() {
    return this.http.get<TeamDto[]>(this.apiUrl + '/workspace/' + this.workspaceService.currentWorkspace?.id);
  }

  public getMyTeams() {
    return this.http.get<TeamDto[]>(this.apiUrl + '/mine');
  }

  public createTeam(name: string) {
    return this.http.post<TeamDto>(this.apiUrl, {name: name});
  }

  public getTeamMembers(teamId: string)  {
    return this.http.get<MemberDto[]>(this.apiUrl + '/' + teamId + '/members');
  }
}
