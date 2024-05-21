import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageResponse } from 'src/app/_models/response/message.response';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {
  @ViewChild('parentDiv', { static: false }) parentDiv?: ElementRef;
  scrollPosition: number = 0;
  formGroup: FormGroup = new FormGroup({});
  messages:MessageResponse [] = []

  submitMessage(){
    
  }
}
