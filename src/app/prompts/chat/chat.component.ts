import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from '../../providers/chat.service';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  get chatSession() {
    return this.chatService.getSession();
  }

  chatInputCtrl = new FormControl('');

  isLoading = false;

  constructor(private readonly chatService: ChatService) { }


  sendMessage() {
    if (!this.chatInputCtrl.value || this.isLoading) return;
    this.chatService.continueChatting(this.chatInputCtrl.value).subscribe();
    this.chatInputCtrl.setValue('');
  }
}
