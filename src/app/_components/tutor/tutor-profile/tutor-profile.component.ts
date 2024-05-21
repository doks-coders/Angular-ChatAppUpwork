import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent {
  constructor(private router:Router){}

  navigate(link:string){
    this.router.navigateByUrl(link)
  }
}
