import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MemberDto} from "../../../../providers/dto/member.dto";
import {TeamDto} from "../../../../providers/dto/team.dto";

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent implements OnInit {
  dataSource = new MatTableDataSource<MemberDto>();
  displayedColumns: string[] = ['fullname', 'email', 'teams', 'role', 'actions'];
  displayedColumnsTeamMode: string[] = ['fullname', 'email', 'role', 'actions'];

  @Input() set searchTerm(value: string) {
    this.applyFilter(value);
  }

  @Input() set members(value: MemberDto[]) {
    this.dataSource.data = value;
  }

  @Input() teamMode: boolean = false;

  ngOnInit() {
    if (this.teamMode) {
      this.displayedColumns = this.displayedColumnsTeamMode;
    }
  }

  applyFilter(searchTerm: string): void {
    const filterValue = searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
