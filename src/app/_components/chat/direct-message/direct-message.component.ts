import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  userId?: string;

  @Input() message: string = ""
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (data) => {
        let id = data.get("userId");
        if (id) {
          this.userId = id;
        }
      }
    })
  }
}
