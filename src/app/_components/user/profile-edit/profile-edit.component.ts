import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  loaded: boolean = false;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.userService.getUserInformation().subscribe({
      next: (user) => {
        if (user) {
          console.log({ user });
          this.formGroup = this.formBuilder.group({
            userName: [user.userName]
          })
          if (user.profilePicture != "") {
            this.formerImage = user.profilePicture;
            this.image = user.relativeProfilePicture;
          }
          this.loaded = true;
        }
      }
    })
  }
  formerImage: string = "";
  selectedImage?: File;
  image: string = "";
  onFileSelected(event: any) {
    this.selectedImage = event.target?.files[0];
  }

  uploadImage() {
    if (this.selectedImage) {
      this.userService.uploadProfilePicture(this.selectedImage, this.formerImage).subscribe({
        next: (value: any) => {
          this.image = value.relativeUrl
          this.formerImage = value.fullUrl;
          this.selectedImage = undefined;
        }
      })
    }
  }

  updateUserInformation() {

  }






}

