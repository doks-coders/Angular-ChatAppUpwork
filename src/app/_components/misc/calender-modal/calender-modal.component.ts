import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DateObject } from 'src/app/_models/shared-models/date-object';
import { MemoData } from 'src/app/_models/shared-models/memo-data';




@Component({
  selector: 'app-calender-modal',
  templateUrl: './calender-modal.component.html',
  styleUrls: ['./calender-modal.component.css']
})
export class CalenderModalComponent implements OnInit {
  dateObject?: DateObject
  incomingTime?:string
  submittedData?:MemoData
  memoTypes:string[]=["Meeting", "Interview","Coding Lesson"]
  isSubmitted:boolean=false;
  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private toastr: ToastrService) { }
  form:FormGroup = new FormGroup({})
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type:["",Validators.required],
      bookInfo:["",Validators.required],
      time:[this.incomingTime?this.convertIncomingTimeToDateTime(this.incomingTime):"",Validators.required]
    })
  }
  confirm() {

    this.bsModalRef.hide();
  }
  //19:50
  convertIncomingTimeToDateTime(time: string) {
    const today = new Date();
  
    const year = today.getFullYear();
    const month = today.getMonth(); 
    const day = today.getDate();

    const [hours, minutes] = time.split(':').map(Number);

    const date = new Date(year, month, day, hours, minutes);

    const dateString = date.toDateString();
    const timeString = date.toTimeString().split(' ')[0]; // Extract time without timezone
    return `${dateString} ${timeString}`;
  
  }
  converTimeToStringFormat(time:string){
    let date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`
  }
  submit() {
    if (this.form.valid) {
      let memo:MemoData = this.form.value
      memo.time = this.converTimeToStringFormat(memo.time);
      memo.date = `${this.dateObject?.day}/${this.dateObject?.month}/${this.dateObject?.year}`
      this.submittedData = memo;
      this.isSubmitted=true;
      this.bsModalRef.hide();
    }
  }
  decline() {

    this.bsModalRef.hide();
  }

}
