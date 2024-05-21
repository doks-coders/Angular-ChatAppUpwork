import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-search',
  templateUrl: './tutor-search.component.html',
  styleUrls: ['./tutor-search.component.css']
})
export class TutorSearchComponent {
  items:number [] = [1,2,4,5]
  constructor(private router:Router){}

  navigateToInfo(){
    this.router.navigateByUrl("tutor-profile");
  }
}
