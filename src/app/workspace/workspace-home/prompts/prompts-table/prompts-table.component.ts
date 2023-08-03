import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PromptDto} from "../../../../providers/dto/prompt.dto";

@Component({
  selector: 'app-prompts-table',
  templateUrl: './prompts-table.component.html',
  styleUrls: ['./prompts-table.component.scss']
})
export class PromptsTableComponent implements OnInit {
  dataSource = new MatTableDataSource<PromptDto>();
  displayedColumns: string[] = ['name', 'description', 'text', 'categories', 'actions'];

  @Input() set searchTerm(value: string) {
    this.applyFilter(value);
  }

  @Input() set prompts(value: PromptDto[]) {
    this.dataSource.data = value;
  }

  @Output() deleted = new EventEmitter<PromptDto>();

  ngOnInit() {
  }

  applyFilter(searchTerm: string): void {
    const filterValue = searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  delete(prompt: PromptDto) {
    this.deleted.emit(prompt);
  }
}
