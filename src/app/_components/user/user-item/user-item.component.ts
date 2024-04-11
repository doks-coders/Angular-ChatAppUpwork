import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input() name: string = ""
  @Input() id: string = ""
  @Input() email: string = ""
  @Input() imageUrl: string = ""
}
