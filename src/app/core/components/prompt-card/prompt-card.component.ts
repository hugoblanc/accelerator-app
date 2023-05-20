import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PromptDto} from "../../../providers/dto/prompt.dto";

@Component({
  selector: 'app-prompt-card',
  templateUrl: './prompt-card.component.html',
  styleUrls: ['./prompt-card.component.scss']
})
export class PromptCardComponent implements OnInit {

  @Input() prompt: PromptDto | undefined;

  @Input() mode: 'gallery' | 'home' = 'gallery';

  @Input() isInList: boolean = false;

  @Output() addedToList = new EventEmitter<PromptDto>();
  @Output() removedFromList = new EventEmitter<PromptDto>();

  constructor() {

  }

  ngOnInit(): void {
    if (this.mode === 'home') {
      this.isInList = true;
    }
  }

  addToList() {
    this.addedToList.emit(this.prompt);
  }

  removeFromList() {
    this.removedFromList.emit(this.prompt);
  }
}
