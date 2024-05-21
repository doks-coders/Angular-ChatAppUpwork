import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './_modules/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeComponent } from './_components/home/home.component';

import { NavbarComponent } from './_components/layout/navbar/navbar.component';

import { GroupedInputComponent } from './_components/misc/grouped-input/grouped-input.component';

import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { LoginComponent } from './_components/authentication/login/login.component';
import { RegisterComponent } from './_components/authentication/register/register.component';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { CheckEmailPageComponent } from './_components/misc/check-email-page/check-email-page.component';
import { TutorSearchComponent } from './_components/tutor/tutor-search/tutor-search.component';
import { TutorProfileComponent } from './_components/tutor/tutor-profile/tutor-profile.component';
import { CalenderComponent } from './_components/tutor/calender/calender.component';
import { CalenderModalComponent } from './_components/misc/calender-modal/calender-modal.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BookingInfoComponent } from './_components/misc/booking-info/booking-info.component';
import { ChatPageComponent } from './_components/chat/chat-page/chat-page.component';
import { ChatMessageComponent } from './_components/chat/chat-message/chat-message.component';
import { VideoElementsComponent } from './_components/video-edit/video-elements/video-elements.component';
import { RtchomeComponent } from './_components/webrtc/rtchome/rtchome.component';
import { RtcclientComponent } from './_components/webrtc/rtcclient/rtcclient.component';
import { RtcclientComponent2 } from './_components/webrtc/rtcclient-2/rtcclient-2.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    GroupedInputComponent,
    LoginComponent,
    RegisterComponent,
    CheckEmailPageComponent,
    TutorSearchComponent,
    TutorProfileComponent,
    CalenderComponent,
    CalenderModalComponent,
    BookingInfoComponent,
    ChatPageComponent,
    ChatMessageComponent,
    VideoElementsComponent,
    RtchomeComponent,
    RtcclientComponent,
    RtcclientComponent2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
