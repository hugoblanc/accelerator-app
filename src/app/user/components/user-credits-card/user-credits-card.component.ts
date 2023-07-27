import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../providers/subscription.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-credits-card',
  templateUrl: './user-credits-card.component.html',
  styleUrls: ['./user-credits-card.component.scss']
})
export class UserCreditsCardComponent implements OnInit {

  subscription$!: Observable<any>;

  constructor(private readonly subscriptionService: SubscriptionService) { }


  ngOnInit(): void {
    this.subscription$ = this.subscriptionService.getSubscription();
  }



}
