import { Component, Input, input, signal } from '@angular/core';
import { FilterTablePipe } from '../../filter-table.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [FilterTablePipe, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  data = input.required<string[][]>();
  searchTerm = signal('');
}
