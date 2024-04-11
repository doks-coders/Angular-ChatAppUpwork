import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { TokenResponse } from './_models/response/token.response';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authServce: AuthService) { }
  ngOnInit(): void {
    this.authServce.intialiseToken();
  }

}
