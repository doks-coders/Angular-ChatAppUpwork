import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoData } from 'src/app/_models/shared-models/memo-data';
import { BookingService } from 'src/app/_services/booking.service';

@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.css']
})
export class BookingInfoComponent implements OnInit{
  constructor(private bookinService:BookingService, public router:Router){}
  data?:MemoData
  ngOnInit(): void {
   if(this.bookinService.currentBooking){
    this.data = this.bookinService.currentBooking;
   }
  }


  
}
