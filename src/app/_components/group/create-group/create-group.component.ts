import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateGroupRequest } from 'src/app/_models/requests/create-group.request';
import { GroupService } from 'src/app/_services/group.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private groupService: GroupService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ["", Validators.required],
      description: ['', Validators.required]
    })
  }

  createGroup() {
    let request: CreateGroupRequest = {
      profile_image_url: "",
      name: this.formGroup.value["name"],
      description: this.formGroup.value["description"],
      IsPublic: true
    }
    this.groupService.createGroup(request).subscribe({
      next: (_) => {
        this.router.navigateByUrl("/my-groups");
      }
    })
  }
}
