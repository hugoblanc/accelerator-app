import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../providers/team.service";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TeamDto} from "../../../providers/dto/team.dto";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  searchTerm: string = '';

  constructor(public teamService: TeamService,
              private snackbar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  delete(team: TeamDto) {
    this.dialog.open(ConfirmDialogComponent,
      {
        width: '400px',
        height: '200px',
      }).afterClosed().subscribe((result) => this.onConfirmDialogClosed(result, team));
  }

  onConfirmDialogClosed(result: boolean, team: TeamDto) {
    if (result) {
      this.teamService.delete(team.id).subscribe(
        () => {
          this.teamService.teams = this.teamService.teams.filter((p) => p.id !== team.id);
          this.snackbar.open('Team deleted', 'OK', {duration: 3000});
        }
      );
    }
  }
}
