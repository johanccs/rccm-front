import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main-home.component.html',
  styleUrls: ['./nav-main-home.component.scss']
})
export class NavMainHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('user1');
    this.router.navigate(['login']);
  }

}
