import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserResponse } from 'src/app/_models/response/user.response';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'src/app/_services/message.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserResponse[] = [];
  searchFormGroup: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      }
    })

    this.searchFormGroup = this.formBuilder.group({
      query: [""]
    })

  }

  searchForGroups() {
    if (this.searchFormGroup.valid) {
      let query: string = this.searchFormGroup.value["query"];
      if (query != "") {
        this.userService.searchForUsers(query).subscribe({
          next: (users) => {
            if (users) {
              this.users = users;
            }
          }
        })

      } else {

        this.userService.getUsers().subscribe({
          next: (users) => {
            this.users = users;
          }
        })
      }


    }
  }

}
