import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TeamDto} from "../../../../providers/dto/team.dto";

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss']
})
export class TeamsTableComponent implements OnInit {
  dataSource = new MatTableDataSource<TeamDto>();
  displayedColumns: string[] = ['name', 'membersCount', 'promptsCount'];

  searchTerm: string = '';

  constructor() {
  }

  ngOnInit() {
    const teams: TeamDto[] = [
      { id: '1', name: 'Recruitment', membersCount: 2, promptsCount: 3 },
      { id: '2', name: 'Business', membersCount: 4, promptsCount: 3 },
      { id: '3', name: 'Marketing', membersCount: 41, promptsCount: 3 },
      // Add more data as needed
    ];

    this.dataSource.data = teams;
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
