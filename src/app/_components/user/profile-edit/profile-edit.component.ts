import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateUserInformationRequest } from 'src/app/_models/requests/update-user-information.request';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  loaded: boolean = false;
  constructor(private userService: UserService, private formBuilder: FormBuilder,private toastr:ToastrService) { }
  ngOnInit(): void {
    this.userService.getUserInformation().subscribe({
      next: (user) => {
        if (user) {
          this.formGroup = this.formBuilder.group({
            userName: [user.userName,Validators.required],
            phoneNumber:[user.phoneNumber,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
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
    let request:UpdateUserInformationRequest =  this.formGroup.value;

    this.userService.updateUserInformation(request).subscribe({
      next:(_)=>{
        this.formGroup.reset();
        this.toastr.success("User details updated successfully")

      }
    })
  }






}

