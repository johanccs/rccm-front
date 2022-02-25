import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProviderCreateDto } from 'src/app/models/provider-create-dto';

@Injectable({
  providedIn: 'root'
})
export class CardProviderService {

  private apiUrl = 'https://localhost:5001/api/v1';

  constructor(private http: HttpClient) { }

  public getAll(){

    const url = `${this.apiUrl}/CardProvider`;

    return this.http.get(url);
  }

  public delete(id: number){

    const url = `${this.apiUrl}/CardProvider/${id}`;

    return this.http.delete(url);
  }

  public create(entity: ProviderCreateDto){

    const url = `${this.apiUrl}/CardProvider`

    return this.http.post(url, entity);
  }

}
