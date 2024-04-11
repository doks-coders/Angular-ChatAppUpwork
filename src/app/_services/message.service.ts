import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageRequest } from '../_models/requests/message.request';
import { environment } from 'src/environments/environment';
import { GroupResponse } from '../_models/response/group.response';
import { UserResponse } from '../_models/response/user.response';
import { BehaviorSubject, map, of, take } from 'rxjs';
import { MessageResponse } from '../_models/response/message.response';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { TokenResponse } from '../_models/response/token.response';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  refreshObserver = new BehaviorSubject<string | null>(null);
  $refresh = this.refreshObserver.asObservable();


  hubConnection?: HubConnection;
  messagesSource = new BehaviorSubject<MessageResponse[]>([]);
  $messagesObserved = this.messagesSource.asObservable();

  constructor(private httpClient: HttpClient) {
   
  }


  intialiseConnection(tokenResponse: TokenResponse, recieverId: string, isGroup: string) {
    this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl + `messages?RecieverId=${recieverId}&isGroup=${isGroup}`, {
      accessTokenFactory() {
        return tokenResponse.token;
      }
    })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start();

    this.hubConnection.on("UserMessages", (element) => {
      this.messagesSource.next(element);
    })

    this.hubConnection.on("NewMessage", (element) => {
      this.$messagesObserved.pipe(take(1)).subscribe({
        next: (messages) => {
          let newMessages = [...messages, element];
          this.messagesSource.next(newMessages);
        }
      })

    })

  }

  disconnectFromHub() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }

  }
  sendMessageUsingHub(message: MessageRequest) {
    return this.hubConnection?.invoke("SendMessage", message);
  }
  getChatMessages(recieverId: string, isGroup: boolean) {
    return this.httpClient.get<MessageResponse[]>(this.baseUrl + `message/get-chatmessages?recieverId=${recieverId}&isGroup=${isGroup}`)
  }
  sendMessage(messageRequest: MessageRequest) {
    return this.httpClient.post(this.baseUrl + "message/send-message", messageRequest)
  }



}
