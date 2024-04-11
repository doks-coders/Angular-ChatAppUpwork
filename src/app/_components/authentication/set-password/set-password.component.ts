import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      password: ["", [Validators.required, Validators.minLength(6)]],
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
