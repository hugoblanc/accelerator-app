import {Component, Input} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MemberDto} from "../../../../providers/dto/member.dto";

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent {
  dataSource = new MatTableDataSource<MemberDto>();
  displayedColumns: string[] = ['fullname', 'email', 'teams', 'role', 'actions'];

  @Input() set searchTerm(value: string) {
    this.applyFilter(value);
  }

  ngOnInit() {
    const members: MemberDto[] = [
      {id: '1', firstname: 'John', lastname: 'Doe', email: 'john.doe@gmail.com', role: 'member', teams: []},
      {id: '2', firstname: 'Jane', lastname: 'Doe', email: 'jane.doe@gmail.com', role: 'member', teams: []},
      {id: '3', firstname: 'Bob', lastname: 'Smith', email: 'bob.smith@gmail.com', role: 'member', teams: []},
      {id: '4', firstname: 'Alice', lastname: 'Johnson', email: 'alice.johnson@gmail.com', role: 'member', teams: []},
      {id: '5', firstname: 'Michael', lastname: 'Williams', email: 'michael.williams@gmail.com', role: 'member', teams: []},
      {id: '6', firstname: 'Emily', lastname: 'Brown', email: 'emily.brown@gmail.com', role: 'member', teams: []},
      {id: '7', firstname: 'William', lastname: 'Jones', email: 'william.jones@gmail.com', role: 'member', teams: []},
      {id: '8', firstname: 'Olivia', lastname: 'Davis', email: 'olivia.davis@gmail.com', role: 'member', teams: []},
      {id: '9', firstname: 'James', lastname: 'Miller', email: 'james.miller@gmail.com', role: 'member', teams: []},
      {id: '10', firstname: 'Sophia', lastname: 'Wilson', email: 'sophia.wilson@gmail.com', role: 'member', teams: []},
    ];

    this.dataSource.data = members;
  }

  applyFilter(searchTerm: string): void {
    const filterValue = searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
