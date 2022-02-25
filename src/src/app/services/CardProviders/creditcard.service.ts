import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCardCreateDto } from 'src/app/models/creditcard-create-dto';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:5001/api/v1';

  public getAll(){

    const url = `${this.apiUrl}/CreditCard`;

    return this.http.get(url);
  }

  public deleteCard(id: number){

    const url = `${this.apiUrl}/CreditCard/${id}`;

    return this.http.delete(url);
  }

  public createCard(card: CreditCardCreateDto){

    const url = `${this.apiUrl}/CreditCard`;

    return this.http.post(url,card);
  }
}
