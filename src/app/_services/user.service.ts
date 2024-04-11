import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../_models/response/user.response';
import { MessageService } from './message.service';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  userResponses: UserResponse[] = []
  constructor(private httpClient: HttpClient,private messageService:MessageService) {

    this.messageService.$refresh.subscribe({
      next: (_) => {
        this.userResponses = [];
      }
    })

   }

  
  getUsers() {
    if (this.userResponses.length) {
      return of(this.userResponses);
    }
    return this.httpClient.get<UserResponse[]>(this.baseUrl + "users/get-users").pipe(map(users => {
      this.userResponses = users;
      return users;
    }))
  }

  getUserInformation() {
    return this.httpClient.get<UserResponse>(this.baseUrl + "users/get-user-information")
  }

  searchForUsers(predicate: string) {
    return this.httpClient.get<UserResponse[]>(this.baseUrl + "users/search-users?search=" + predicate)
  }
  uploadProfilePicture(image: File, formerImage: string) {
    let formData = new FormData();
    formData.append("file", image);
    formData.append("formerFile", formerImage);
    return this.httpClient.post(this.baseUrl + "users/upload-image", formData)
  }

}
