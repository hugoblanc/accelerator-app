import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "./providers/auth.service";
import { UserService } from "./providers/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService,
    private router: Router,
    public readonly userService: UserService) {
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userService.setCurrentUser().subscribe();
    }
    this.scrollToBottom();
  }

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;



  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
