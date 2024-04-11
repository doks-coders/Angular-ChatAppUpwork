import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupResponse } from 'src/app/_models/response/group.response';
import { GroupService } from 'src/app/_services/group.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: GroupResponse[] = [];
  searchFormGroup: FormGroup = new FormGroup({});
  constructor(private messageService: MessageService, private groupService: GroupService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe({
      next: (value) => {
        if (value) {
          this.groups = value;
        }
      }
    })

    this.searchFormGroup = this.formBuilder.group({
      query: [""]
    })

  }

  searchGroup() {
    if (this.searchFormGroup.valid) {
      let query: string = this.searchFormGroup.value["query"];
      if (query != "") {
        this.groupService.searchForGroups(query).subscribe({
          next: (groups) => {
            if (groups) {
              this.groups = groups;
            }
          }
        })

      } else {

        this.groupService.getGroups().subscribe({
          next: (value) => {
            if (value) {
              this.groups = value;
            }
          }
        })
      }


    }
  }



}
