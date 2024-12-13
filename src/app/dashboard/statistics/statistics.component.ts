import { CurrencyPipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  imports: [CurrencyPipe],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  data = input.required<string[][]>();
  dienstDaten: { [key: string]: { sumDauer: number, sumKosten: number, avgKosten: number } } = {};
  dienstTypen: Set<string> = new Set();
  
  ngOnInit() {
    const d = this.data().slice(1);
    this.dienstTypen = new Set(d.map(row => row[3]));
    this.dienstTypen.forEach(dienstTyp => {
      const diesnsteMitTyp = d.filter(row => row[3] === dienstTyp);
      const sumDauer = diesnsteMitTyp.reduce((acc, row) => acc + parseInt(row[4]), 0);
      const sumKosten = diesnsteMitTyp.reduce((acc, row) => acc + parseInt(row[6]), 0);
      this.dienstDaten[dienstTyp] = {
        sumDauer,
        sumKosten,
        avgKosten: sumKosten / diesnsteMitTyp.length
      };
    });
  }
}
