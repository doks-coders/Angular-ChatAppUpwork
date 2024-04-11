import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SetPasswordRequest } from 'src/app/_models/requests/set-password.request';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router, private messageService: MessageService) { }

  userId?: string;
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6),this.passwordValidator()]],
      confirmPassword: ["", [Validators.required, this.matchValues("password")]]
    })

    this.formGroup.controls["password"].valueChanges.subscribe({ //checks if password changes
      next: () => {
        return this.formGroup.controls["confirmPassword"].updateValueAndValidity()
      }
    })


    this.route.paramMap.subscribe({
      next: (data) => {
        let id = data.get("userId");
        if (id) {
          this.userId = id;
        }
      }
    })
  }

   passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value || '';
      
      // Regular expressions for uppercase letter, number, and alphanumeric
      const uppercaseRegex = /[A-Z]/;
      const numberRegex = /[0-9]/;
      const alphanumericRegex = /^[a-zA-Z0-9]*$/;
  
      // Check if the password contains at least one uppercase letter
      if (!uppercaseRegex.test(value)) {
        return { 'uppercaseNotFound': true };
      }
  
      // Check if the password contains at least one number
      if (!numberRegex.test(value)) {
        return { 'numberNotFound': true };
      }
  
      if (alphanumericRegex.test(value)) {
        return { 'alphaNumericNotFound': true };
      }
  
  
      return null; // Return null if the password meets all criteria
    };
   }
  
  matchValues(matchTo: string) {
    return (control: AbstractControl) => {
      return (control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true })
    }
  }

  setPassword() {
    let passwordReq: SetPasswordRequest = this.formGroup.value;
    if (this.userId) {
      passwordReq.userId = this.userId;
    }
    this.authService.setPassword(passwordReq).subscribe({
      next: () => {
        this.messageService.refreshObserver.next(Math.random().toString())
        this.router.navigateByUrl('/');
      }
    })
  }



}
