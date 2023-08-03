import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TeamDto} from "./dto/team.dto";
import {MemberDto} from "./dto/member.dto";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl: string = '/teams';

  teams: TeamDto[] = [];
  isTeamsLoading: boolean = false;

  constructor(private http: HttpClient) {
  }

  public getTeam(teamId: string) {
    return this.http.get<TeamDto>(this.apiUrl + '/' + teamId);
  }

  public getWorkspaceTeams() {
    this.isTeamsLoading = true;
    // TODO Change /temp because i don't why but its failing with /workspace
    return this.http.get<TeamDto[]>(this.apiUrl + '/workspace/temp').subscribe(
      (teams: TeamDto[]) => this.getTeamsSuccess(teams)
    );
  }

  private getTeamsSuccess(teams: TeamDto[]) {
    this.teams = teams;
    this.isTeamsLoading = false;
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

  public getTeamsWhereCanCreatePrompt() {
    return this.http.get<TeamDto[]>(this.apiUrl + '/mine');
  }

  public delete(teamId: string) {
    return this.http.delete(this.apiUrl + '/' + teamId);
  }

  public removeMember(teamId: string, memberId: string) {
    return this.http.delete(this.apiUrl + '/member/' + memberId);
  }
}
