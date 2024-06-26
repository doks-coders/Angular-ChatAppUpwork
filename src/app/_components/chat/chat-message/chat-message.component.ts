import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  @Input() messageType: 'partner' | 'personal' = "personal"
  @Input() message: string = ""
  @Input() userName: string = ""
}
