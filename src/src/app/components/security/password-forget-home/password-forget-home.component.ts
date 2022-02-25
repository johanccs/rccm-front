import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-forget-home',
  templateUrl: './password-forget-home.component.html',
  styleUrls: ['./password-forget-home.component.scss'],
  providers: [MessageService]
})
export class PasswordForgetHomeComponent implements OnInit {

  isBusy:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
