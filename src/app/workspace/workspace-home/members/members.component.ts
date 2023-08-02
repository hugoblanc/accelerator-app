import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../providers/team.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {TeamDto} from "../../../providers/dto/team.dto";
import {WorkspaceService} from "../../../providers/workspace.service";
import {MatDialog} from "@angular/material/dialog";
import {MembersAddDialogComponent} from "./members-add-dialog/members-add-dialog.component";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";
import {MemberDto} from "../../../providers/dto/member.dto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  searchTerm: string = '';

  members: any[] = [];

  team: TeamDto | undefined;

  isLoading: boolean = false;

  constructor(private teamService: TeamService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private workspaceService: WorkspaceService,
              private route: ActivatedRoute) {
    this.isLoading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
      const teamId = params.get('teamId');
      if (teamId) {
        this.teamService.getTeam(teamId).subscribe((team) => {
          this.team = team;
          this.getMembers();
        });
      } else {
        this.getMembers();
      }
    });
  }

  ngOnInit() {

  }

  getMembers() {
    if (this.team) {
      this.teamService.getTeamMembers(this.team.id).subscribe((members) => {
        this.members = members;
        this.isLoading = false;
      });
    } else { // if teamId is undefined, get all workspace members
      this.workspaceService.getMembers().subscribe((members) => {
        this.members = members;
        this.isLoading = false;
      });
    }
  }

  openAddMemberDialog() {
    this.dialog.open(MembersAddDialogComponent, {
      width: '400px',
      data: this.team
    }).afterClosed().subscribe((result) => this.onAddMemberDialogClosed(result));
  }

  onAddMemberDialogClosed(result: boolean) {
    if (result) {
      this.getMembers();
    }
  }


  delete(member: MemberDto) {
    this.dialog.open(ConfirmDialogComponent,
      {
        width: '400px',
        height: '200px',
      }).afterClosed().subscribe((result) => this.onConfirmDialogClosed(result, member));
  }

  onConfirmDialogClosed(result: boolean, member: MemberDto) {
    if (result) {
      if (this.team) { // Team remove member
        this.teamService.removeMember(this.team.id, member.id).subscribe(
          () => this.removeSuccess(member)
        );
      } else { // Workspace remove member
        this.workspaceService.removeMember(member.id).subscribe(
          () => this.removeSuccess(member)
        );
      }
    }
  }

  private removeSuccess(member: MemberDto) {
    this.members = this.members.filter((p) => p.id !== member.id);
    this.snackbar.open('Member removed', 'OK', {duration: 3000});
  }
}
