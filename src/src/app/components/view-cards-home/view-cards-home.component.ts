import { Component, OnInit } from '@angular/core';
import { CreditCardViewDto, ICreditCardView } from 'src/app/models/creditcard-view-dto';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards-home.component.html',
  styleUrls: ['./view-cards-home.component.scss']
})
export class ViewCardsHomeComponent implements OnInit {

  cards: ICreditCardView[] = [];
  displayColumns: string[] = ["cardNumber", "provider"]
 
  constructor() { }

  ngOnInit(): void {
    this.loadCreditCards();
  }

  private loadCreditCards(){
    this.cards = [
      new CreditCardViewDto("123", "Visa"),
      new CreditCardViewDto("456", "MasterCard"),
      new CreditCardViewDto("789", "Amex"),
      new CreditCardViewDto("10,11,12", "Diners Club"),
      new CreditCardViewDto("13,14,15", "Visa"),
    ];
  }

}
