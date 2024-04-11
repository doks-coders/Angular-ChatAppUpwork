import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, take } from 'rxjs';
import { MessageRequest } from 'src/app/_models/requests/message.request';
import { MessageResponse } from 'src/app/_models/response/message.response';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  @ViewChild('parentDiv', { static: false }) parentDiv?: ElementRef;
  scrollPosition: number = 0;
  formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, public messageService: MessageService, private authService: AuthService) {
    this.messageService.messagesSource.next([])
  }
  @Input() isGroup: boolean = false;
  @Input() recieverId: string = "";

  userId: string = "";

  messages: MessageResponse[] = [];


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      content: ["",Validators.required]
    });
    if (this.recieverId != "") {
      this.authService.getUserId().pipe(take(1)).subscribe({
        next: (id) => {
          if (id) {
            this.userId = id;
            this.getMessagesFromHub();
          }
        }
      })

      this.messageService.$messagesObserved.pipe(delay(100)).subscribe({
        next: (_) => {
          this.scrollToElement();
        }
      })
    }
  }

  getMessagesFromHub() {
    this.authService.token$.pipe(take(1)).subscribe({
      next: (token) => {
        if (token) {
          this.messageService.intialiseConnection(token, this.recieverId, this.isGroup.toString());
        }
      }
    })

  }
  scrollToElement() {
    if (this.parentDiv) {
      this.scrollPosition += this.parentDiv.nativeElement.scrollHeight + 50;
    }
  }

  submitMessage() {
    if (this.formGroup.valid) {
      let message: MessageRequest = this.formGroup.value;
      message.isGroup = this.isGroup;
      message.recieverId = this.recieverId;

      this.formGroup.reset();
      this.messageService.sendMessageUsingHub(message);
      /*
      this.messageService.sendMessage(message).subscribe({
        next:(_)=>{
          this.scrollToElement();
        }
      })
      */
    }
  }
}
