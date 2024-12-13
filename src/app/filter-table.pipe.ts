import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(table: string[][], searchTerm: string): string[][] {
    if (!searchTerm) {
      return table;
    }
    const terms = searchTerm.split(' ');
    return table.filter((row, index) => index === 0 || terms.every(term => row.some(cell => cell.includes(term))));
    // return table.filter((row, index) => index === 0 || row.some(cell => cell.includes(searchTerm)));
  }

}
