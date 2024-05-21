import { Injectable } from '@angular/core';
import { MemoData } from '../_models/shared-models/memo-data';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  currentBooking?:MemoData
  constructor() { }

  setBookingInfo(data:MemoData){
    this.currentBooking = data
  }
}
