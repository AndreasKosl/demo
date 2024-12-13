import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private user: string | null;

    constructor(private http: HttpClient) {
      this.user = null;
      // this.user = "01";
    }

    register(username: string, password: string) {
        return this.http.post<{ message: string }>(`${environment.apiUrl}/users/register`, { userID: username, password: password });
    }

    login(username: string, password: string) {
        return this.http.post<{ message: string }>(`${environment.apiUrl}/users/auth`, { userID: username, password: password }).pipe(tap((response) => {
          if(response.message === "Authentication successful") {
            this.user = username;
          }
    }));
    }

    isLoggedIn() {
      console.log("Current user is:", this.user);
      return this.user !== null;
    }
    
    getUser(): string {
      return this.user || "";
    }

}