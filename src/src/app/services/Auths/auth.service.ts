import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginViewDto } from 'src/app/models/login-view-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:5001/api/v1';

  constructor(private http: HttpClient) { }

  public login(loginDto: LoginViewDto){

    const url = `${this.apiUrl}/auth`;

    return this.http.post(url, loginDto);
  }

}
