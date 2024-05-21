import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/_models/requests/login.request';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({});
  loginRequest?: LoginRequest;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ["", Validators.email],
      password: ["", Validators.required]
    })
  }

  loginUser() {
    this.authService.loginUser(this.formGroup.value).subscribe({
      next: (_) => {
         this.router.navigateByUrl('/');
      },
    })
  }
}
