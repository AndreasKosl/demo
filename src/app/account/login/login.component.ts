import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  error: string | null = null;

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.username || "", this.loginForm.value.password || "")
      .subscribe({
        next: () => this.authService.isLoggedIn() && this.router.navigate(['/']),
        error: () => this.error = "Falscher Benutzername oder Passwort!"
      });
    }
    else{
      this.error = "Bitte füllen Sie alle Felder aus!";
    }
  }
}