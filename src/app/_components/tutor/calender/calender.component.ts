import { Component, OnInit } from '@angular/core';
import { CalenderModalComponent } from '../../misc/calender-modal/calender-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DateObject } from 'src/app/_models/shared-models/date-object';
import { MemoData } from 'src/app/_models/shared-models/memo-data';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/_services/booking.service';
import { Router } from '@angular/router';


interface CalenderDay {
  isToday: boolean
  isAvailable: boolean
  day: number
  memo: string[]
}

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {
  bsModalRef: BsModalRef<CalenderModalComponent> = new BsModalRef<CalenderModalComponent>


  selectedMonth = "0";
  year = 2024
  month = 5
  daySelected=0
  today = 0
  totalDays = 0


  daysOftheMonth: CalenderDay[] = []
  emptyDays:number[] =[]


  daysOfWeek: string[] = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"]
  monthsInaYear: string[] = ["JANUARY", "FERBUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  created_schedules:MemoData [] = []
  schedules: MemoData [] = [
    { date: "16/5/2024", bookInfo: "Meeting with Daniel", type: "Meeting", time: "12:00pm" },
    { date: "3/5/2024", bookInfo: "Meeting with Samuel", type: "Meeting", time: "12:00pm" },
  ]
  unavailableDays = {
    weekly: ["1", "7"], //days for //week,days
    custom: [] //specific month, week, day
  }

  constructor(private modalService: BsModalService,private toastr:ToastrService,private bookingService:BookingService,private router:Router) { }

  ngOnInit(): void {
    const date = new Date();
    this.year = date.getFullYear();
    this.today = date.getDate();
    this.month = date.getMonth() + 1;
    this.selectedMonth = this.month.toString();
    this.totalDays = this.getDaysInMonth(this.year, this.month);
    this.getFirstEmptyDaysInGrid()
    this.generateDayofMonthsItems();
  }



  showModal(day:number) {
    console.log(`${day}/${this.month}/${this.year}`)

    let dateObject:DateObject = {
      day,
      month:this.month,
      year:this.year
    }
    const config = {
      initialState: {
        dateObject
      }
    }
    if(this.created_schedules.length==1){
     this.toastr.error("You cannot create more than one schedule");
     return;
     }
    this.bsModalRef = this.modalService.show(CalenderModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
       
        if(this.bsModalRef.content?.isSubmitted){
          if(this.bsModalRef.content?.submittedData){
            let data = this.bsModalRef.content?.submittedData;
            this.schedules.push(data);
            this.created_schedules.push(data)
            this.bookingService.setBookingInfo(data);
            this.generateDayofMonthsItems();
          }
         
        }
     

      }
    })
  }

  goToBookingInfoPage(){
    this.router.navigateByUrl("/booking-info");
  }



  getMonthSelected() {
    this.month = Number(this.selectedMonth)
    this.getFirstEmptyDaysInGrid();
    this.totalDays = this.getDaysInMonth(this.year, this.month);
    this.generateDayofMonthsItems();
  }

  //Calculates the empty spaces in the first week of a month
  getFirstEmptyDaysInGrid(){
    let emptydaysNumber = this.getFirstDayOfMonth(this.month);
    this.emptyDays = Array.from({ length: emptydaysNumber }, () => 0);
   
  }

  generateDayofMonthsItems() {
    this.daysOftheMonth=[];
    console.log(this.schedules)
    for (let i = 1; i <= this.totalDays; i++) {
      const memo: string[] = [];
      this.schedules.forEach(schedule => {
        let date = this.convertStringToDate(schedule.date);
        if (i == date.getDate() && this.year == date.getFullYear() && this.month == date.getMonth()) {
          memo.push(schedule.type)
        }


      })
      
      this.daysOftheMonth.push({ isToday: (i == this.today), 
        isAvailable: !this.unavailableDays.weekly.includes((this.getDayOfWeek(this.year,this.month,i)+1).toString()), 
        day: i, memo });
    }
  }

  getFirstDayOfMonth(month: number, year: number=new Date().getFullYear()) {
    return this.getDayOfWeek(year,month,1);
  }

  getDayOfWeek(year:number, month:number, day:number) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek;
  }

  getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }
  convertStringToDate(dateString: string) {
    const [day, month, year] = dateString.split('/').map(Number); // Split the string and convert components to numbers

    const date = new Date(year, month, day);
    return date;
  }


}
