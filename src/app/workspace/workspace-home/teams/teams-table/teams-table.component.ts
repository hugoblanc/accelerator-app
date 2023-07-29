import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TeamDto} from "../../../../providers/dto/team.dto";

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss']
})
export class TeamsTableComponent implements OnInit {
  dataSource = new MatTableDataSource<TeamDto>();
  displayedColumns: string[] = ['name', 'membersCount', 'promptsCount', 'actions'];

  @Input() set searchTerm(value: string) {
    this.applyFilter(value);
  }

  @Input() set teams(value: TeamDto[]) {
    this.dataSource.data = value;
  }

  constructor() {
  }

  ngOnInit() {
  }

  applyFilter(searchTerm: string): void {
    const filterValue = searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
