import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Message } from '../../../providers/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message!: Message;
  @HostBinding('attr.role') role!: string;

  ngOnInit(): void {
    this.role = this.message.role;
    console.log(this.role);
  }
}
