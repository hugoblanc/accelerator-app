import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ChatService } from '../../providers/chat.service';

@Injectable({
  providedIn: 'root'
})
export class SessionInitGuard implements CanActivate {

  constructor(private readonly chatService: ChatService, private readonly router: Router) { }
  canActivate(): boolean | UrlTree {

    if (this.chatService.isSessionInitialized) {
      return true;
    }
    return this.router.createUrlTree(['/prompts']);
  }

}
