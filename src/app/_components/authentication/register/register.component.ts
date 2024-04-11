import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/_models/requests/register.request';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  registerRequest?: RegisterRequest;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService, private router: Router) { }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ["", Validators.email],
      userName: ["", Validators.required],
      phoneNumber: ["", [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    })
  }
  registerUser() {
    this.authService.registerUser(this.formGroup.value).subscribe({
      next: (_) => {
        this.messageService.refreshObserver.next(Math.random().toString())
        this.router.navigateByUrl('/check-email');
      },
    })
  }

}
