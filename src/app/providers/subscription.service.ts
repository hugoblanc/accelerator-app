import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private readonly http: HttpClient) { }

  getSubscription() {
    return this.http.get('/subscriptions');
  }
}
