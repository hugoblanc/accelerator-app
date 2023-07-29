import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../../../../providers/team.service";
import {TeamDto} from "../../../../providers/dto/team.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss']
})
export class TeamCreateComponent implements OnInit {

  formGp!: FormGroup;

  constructor(private fb: FormBuilder,
              private teamService: TeamService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.formGp = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    this.teamService.createTeam(this.formGp.value.name).subscribe((result) => this.createTeamSuccess(result));
  }

  private createTeamSuccess(team: TeamDto) {
    this.router.navigate(['/workspace/home/teams']).then();
    this.snackBar.open("Team created successfully", 'Close', {duration: 2000});
  }

}
