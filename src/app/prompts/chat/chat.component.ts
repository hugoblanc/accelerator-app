import {Component, NgZone, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from '../../providers/chat.service';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  // @ts-ignore
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  get chatSession() {
    return this.chatService.getSession();
  }

  chatInputCtrl = new FormControl('');
  isLoading = false;

  constructor(private readonly chatService: ChatService,
              private _ngZone: NgZone) { }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  sendMessage() {
    if (!this.chatInputCtrl.value || this.chatSession?.isLoading) return;
    this.chatService.continueChatting(this.chatInputCtrl.value).subscribe();
    this.chatInputCtrl.setValue('');
  }
}
