import { Component, Input } from '@angular/core';
import { GroupResponse } from 'src/app/_models/response/group.response';

@Component({
  selector: 'app-group-grid',
  templateUrl: './group-grid.component.html',
  styleUrls: ['./group-grid.component.css']
})
export class GroupGridComponent {
  @Input() groups: GroupResponse[] = [];
}
