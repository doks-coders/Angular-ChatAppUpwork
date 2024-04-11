import { Component, OnInit } from '@angular/core';
import { GroupResponse } from 'src/app/_models/response/group.response';
import { GroupService } from 'src/app/_services/group.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css']
})
export class MyGroupsComponent implements OnInit {
  myGroups: GroupResponse[] = []
  joinedGroups: GroupResponse[] = []
  constructor(private groupService: GroupService) { }
  ngOnInit(): void {
    this.groupService.getMyGroups().subscribe({
      next: (groups) => {
        this.myGroups = groups;
      }
    })
    this.groupService.getJoinedGroups().subscribe({
      next: (groups) => {
        this.joinedGroups = groups;
      }
    })
  }

}
