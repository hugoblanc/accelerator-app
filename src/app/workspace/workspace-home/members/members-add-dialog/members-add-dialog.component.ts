import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorkspaceService} from "../../../../providers/workspace.service";
import {InviteMemberDto} from "../../../../providers/dto/invite-member.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TeamDto} from "../../../../providers/dto/team.dto";

@Component({
  selector: 'app-members-add-dialog',
  templateUrl: './members-add-dialog.component.html',
  styleUrls: ['./members-add-dialog.component.scss']
})
export class MembersAddDialogComponent implements OnInit {

  formGp!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public team: TeamDto,
              public dialogRef: MatDialogRef<MembersAddDialogComponent>,
              private snackbar: MatSnackBar,
              private workspaceService: WorkspaceService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formGp = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      role: ['user'],
      teamId: [this.team?.id],
    });
  }

  confirm() {
    if (this.formGp.valid) {
      const dto: InviteMemberDto = this.formGp.getRawValue();
      this.workspaceService.inviteMember(dto).subscribe(
        () => this.inviteSuccess(),
        (error) => this.inviteError(error)
      );
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  inviteSuccess() {
    this.snackbar.open("Member invited successfully", 'Close', {duration: 2000})
    this.dialogRef.close(true);
  }

  inviteError(error: any) {
    this.snackbar.open("The user does not exist", 'Close', {duration: 2000})
  }
}
