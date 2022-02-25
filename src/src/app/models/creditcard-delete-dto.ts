export interface ICreditCardDelete{
    id: number;
    cardNumber: number;
}

export class CreditCardDeleteDto implements ICreditCardDelete {
    id: number;
    cardNumber: number;

    constructor(id: number, cardNumber: number){
       this.id = id;
       this.cardNumber = cardNumber;
    }
}