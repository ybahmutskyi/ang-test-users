import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  totalUsers = 150;
  totalCompanies = 10;
  usersPerCompany = { company1: 50, company2: 100, company3: 30 };
}
