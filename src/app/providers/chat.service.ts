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
  isLoading = true;
  // messages: Message[] = [{ "content": "Écris un article sur le thème 50 faisant l'art de long", "role": "system" }, { "content": "Le thème 50 est un sujet fascinant qui peut être exploré de nombreuses façons. L'un des aspects les plus intéressants de ce thème est l'art de la longévité. Comment vivre plus longtemps et en meilleure santé est un sujet qui intéresse de nombreuses personnes, et il y a beaucoup de conseils et de stratégies qui peuvent aider à atteindre cet objectif.\n\nL'un des premiers conseils pour vivre plus longtemps est de manger une alimentation saine et équilibrée. Cela signifie manger beaucoup de fruits et légumes, des grains entiers, des protéines maigres et des graisses saines. Il est également important de limiter la consommation de sucre, de sel et d'aliments transformés.\n\nL'exercice régulier est également essentiel pour une longue vie saine. Les experts recommandent de faire au moins 30 minutes d'exercice modéré chaque jour, comme la marche rapide, la natation ou le vélo. L'exercice aide à maintenir un poids santé, à renforcer les muscles et les os, et à réduire le risque de maladies chroniques comme le diabète et les maladies cardiaques.\n\nLe sommeil est également important pour une longue vie saine. Les adultes devraient viser à dormir entre 7 et 9 heures par nuit. Le sommeil aide à réduire le stress, à améliorer la mémoire et la concentration, et à renforcer le système immunitaire.\n\nLa gestion du stress est également importante pour une longue vie saine. Le stress chronique peut avoir des effets néfastes sur la santé, y compris une pression artérielle élevée, une inflammation et un risque accru de maladies chroniques. Des techniques de gestion du stress comme la méditation, le yoga et la respiration profonde peuvent aider à réduire le stress et à améliorer la santé mentale.\n\nEnfin, il est important de maintenir des relations sociales et de rester engagé dans la vie. Les personnes qui ont des relations sociales fortes et qui sont engagées dans des activités qui leur tiennent à cœur ont tendance à vivre plus longtemps et en meilleure santé que celles qui sont isolées et inactives.\n\nEn conclusion, l'art de la longévité est un sujet fascinant qui peut être exploré de nombreuses façons. En mangeant une alimentation saine, en faisant de l'exercice régulièrement, en dormant suffisamment, en gérant le stress et en maintenant des relations sociales, il est possible de vivre plus longtemps et en meilleure santé. En adoptant ces habitudes saines, vous pouvez profiter d'une vie longue et épanouissante.", "role": "assistant" }];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // chatSession: ChatSession | null = new ChatSession();
  chatSession: ChatSession | null = null;

  get isSessionInitialized() {
    return this.chatSession !== null;
  }

  constructor(private readonly http: HttpClient) { }

  usePrompt(value: any, preview: string) {
    this.chatSession = new ChatSession();
    this.chatSession.messages.push({ content: preview, role: 'user' });

    return this.http.post<{ result: string }>(environment.apiUrl + '/prompts/use/iiiii', value)
      .pipe(
        tap(this.addAssistantResponse.bind(this))
      );
  }
  continueChatting(value: string) {
    this.chatSession?.messages.push({ content: value, role: 'user' });
    return this.http.post<{ result: string }>(environment.apiUrl + '/chat/short-term-memory', this.chatSession)
      .pipe(tap(this.addAssistantResponse.bind(this)));
  }

  private addAssistantResponse(message: { result: string }) {
    if (!this.chatSession) return;

    this.chatSession.messages.push({ content: message.result, role: 'assistant' });
    this.chatSession.isLoading = false;
  }


  getSession() {
    return this.chatSession;
  }

}
