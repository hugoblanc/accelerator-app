import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

export interface Message {
  name?: string;
  content: string;
  role: 'system' | 'assistant' | 'user';
}

class ChatSession {
  messages: Message[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatSession: ChatSession | null = null;

  get isSessionInitialized() {
    return this.chatSession !== null;
  }

  constructor(private readonly http: HttpClient) { }

  usePrompt(value: any, preview: string) {
    this.chatSession = new ChatSession();
    this.chatSession.messages.push({ content: preview, role: 'system' });

    return this.http.post<{ result: string }>(environment.apiUrl + '/prompts/use/iiiii', value)
      .pipe(
        tap((result) => {
          this.chatSession?.messages.push({ content: result.result, role: 'assistant' });
        })
      );
  }
  continueChatting(value: string) {
    this.chatSession?.messages.push({ content: value, role: 'user' });
    return this.http.post<{ result: string }>(environment.apiUrl + '/chat/short-term-memory', this.chatSession)
      .pipe(
        tap((result) => {
          this.chatSession?.messages.push({ content: result.result, role: 'assistant' });
        })
      );
  }



  getSession() {
    return this.chatSession;
  }

}
