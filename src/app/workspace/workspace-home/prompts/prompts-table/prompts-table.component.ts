import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PromptDto} from "../../../../providers/dto/prompt.dto";
import {PromptsService} from "../../../../providers/prompts.service";

@Component({
  selector: 'app-prompts-table',
  templateUrl: './prompts-table.component.html',
  styleUrls: ['./prompts-table.component.scss']
})
export class PromptsTableComponent implements OnInit {
  dataSource = new MatTableDataSource<PromptDto>();
  displayedColumns: string[] = ['name', 'teams', 'actions'];
  displayedColumnsTeamMode: string[] = ['name', 'text', 'actions'];

  @Input() set searchTerm(value: string) {
    this.applyFilter(value);
  }

  @Input() set prompts(value: PromptDto[]) {
    this.dataSource.data = value;
  }

  @Input() teamMode: boolean = false;

  @Output() deleted = new EventEmitter<PromptDto>();

  ngOnInit() {
    if (this.teamMode) {
      this.displayedColumns = this.displayedColumnsTeamMode;
    }
  }

  applyFilter(searchTerm: string): void {
    const filterValue = searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  delete(prompt: PromptDto) {
    this.deleted.emit(prompt);
  }
}
