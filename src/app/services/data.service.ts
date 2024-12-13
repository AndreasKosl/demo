import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getById(id: string): Observable<string[][]> {
    return this.http.get(`${environment.apiUrl}/files/${id}`, { responseType: 'text' }).pipe(
      map(csv => csv.split('\n').map(line => line.split(","))));
  }

}
