import { Injectable } from '@angular/core';
import { UserResponse } from '../_models/response/user.response';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GroupResponse } from '../_models/response/group.response';
import { map, of } from 'rxjs';
import { CreateGroupRequest } from '../_models/requests/create-group.request';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl = environment.apiUrl;
  groupResponses: GroupResponse[] = []
  myGroupResponses: GroupResponse[] = []

  constructor(private httpClient: HttpClient,private messageService:MessageService) {

    this.messageService.$refresh.subscribe({
      next: (_) => {
        this.groupResponses = [];
      }
    })
   }


  getGroupMembers(groupId: string) {
    return this.httpClient.get<UserResponse[]>(this.baseUrl + "group/get-group-members/" + groupId).pipe(map(users => {
      return users;
    }))
  }

  searchForGroups(query: string) {
    return this.httpClient.get<GroupResponse[]>(this.baseUrl + 'group/search-groups?search=' + query)
  }

  createGroup(createGroupRequest: CreateGroupRequest) {
    return this.httpClient.post(this.baseUrl + "group/create-group", createGroupRequest)
  }

  joinGroup(groupId: string) {
    return this.httpClient.get(this.baseUrl + `group/join-group/${groupId}`)
  }

  getJoinedGroups() {
    return this.httpClient.get<GroupResponse[]>(this.baseUrl + `group/get-joined-groups`)
  }


  
  getGroups() {
    if (this.groupResponses.length > 0) {
      return of(this.groupResponses);
    }
    return this.httpClient.get<GroupResponse[]>(this.baseUrl + "group/get-groups").pipe(map(groups => {
      this.groupResponses = groups;
      return groups;
    }))
  }

  getMyGroups() {
    if (this.myGroupResponses.length > 0) {
      return of(this.myGroupResponses);
    }
    return this.httpClient.get<GroupResponse[]>(this.baseUrl + "group/get-my-groups").pipe(map(groups => {
      this.myGroupResponses = groups;
      return groups;
    }))
  }



}
