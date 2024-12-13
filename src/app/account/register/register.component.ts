import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  protected registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  error: string | null = null;

  onSubmit(){
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value.username || "", this.registerForm.value.password || "")
      .subscribe({
        next: data => {
          if(data.message === "User registered successfully"){
            alert("Benutzer wurde erfolgreich erstellt");
            this.router.navigate(['/login']);
          }
        },
        error: () => this.error = "Registrierung fehlgeschlagen!"
      });
    }
    else{
      this.error = "Bitte füllen Sie alle Felder aus!";
    }
  }
}