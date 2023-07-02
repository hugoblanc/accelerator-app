import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PromptDto} from "../../../providers/dto/prompt.dto";
import {UserService} from "../../../providers/user.service";

@Component({
  selector: 'app-user-prompts-list',
  templateUrl: './user-prompts-list.component.html',
  styleUrls: ['./user-prompts-list.component.scss']
})
export class UserPromptsListComponent implements OnInit {

  constructor(private router: Router,
    public readonly userService: UserService) {
  }

  ngOnInit() {
  }

  goToPrompt(prompt: PromptDto) {
    this.router.navigate(['/prompts', prompt.id]).then();
  }

}
