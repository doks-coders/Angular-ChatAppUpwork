import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserResponse } from 'src/app/_models/response/user.response';
import { GroupService } from 'src/app/_services/group.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.css']
})
export class GroupMessageComponent implements OnInit {
  groupId?: string;
  users: UserResponse[] = [];
  constructor(private route: ActivatedRoute, private messageService: MessageService, private groupService: GroupService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (data) => {
        let id = data.get("groupId");
        if (id) {
          this.groupId = id;

          this.groupService.joinGroup(id).subscribe({
            next: (_) => {
              console.log("Joined Successfully")
            }
          })

          this.getGroupMembers();
        }
      }

    })
  }

  getGroupMembers() {
    if (this.groupId) {
      this.groupService.getGroupMembers(this.groupId).subscribe({
        next: (users) => {
          this.users = users;
        }
      })
    }
  }

}
