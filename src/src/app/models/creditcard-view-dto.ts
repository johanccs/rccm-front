export interface ICreditCardView{
    cardNumber: string;
    provider: string;  
}

export class CreditCardViewDto implements ICreditCardView {

    id: number;
    cardNumber: string;
    provider: string;

    constructor(cardNumber: string, provider: string){
        this.cardNumber = cardNumber;
        this.provider = provider;
    }
}