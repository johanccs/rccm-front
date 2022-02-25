export interface ICreditCardView{
    cardNumber: string;
    providerId: number;  
}

export class CreditCardCreateDto implements ICreditCardView {

    cardNumber: string;
    providerId: number;

    constructor(cardNumber: string, providerId: number){
        this.cardNumber = cardNumber;
        this.providerId = providerId;
    }
}