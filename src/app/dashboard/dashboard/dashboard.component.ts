import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TableComponent } from '../table/table.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [TableComponent, StatisticsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  data: string[][] = [];
  error: boolean = false;
  user: string = "";

  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadData();
  }

  loadData() {
    this.error = false;
    this.dataService.getById(this.user).subscribe({
      next: data => (this.data = data, this.error = false),
      error: error => (console.error(error), this.error = true)
    });
  }

}
