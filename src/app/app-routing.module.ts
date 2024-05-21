import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { RegisterComponent } from './_components/authentication/register/register.component';
import { LoginComponent } from './_components/authentication/login/login.component';
import { authGuard } from './_guards/auth.guard';
import { CheckEmailPageComponent } from './_components/misc/check-email-page/check-email-page.component';
import { TutorSearchComponent } from './_components/tutor/tutor-search/tutor-search.component';
import { TutorProfileComponent } from './_components/tutor/tutor-profile/tutor-profile.component';
import { CalenderComponent } from './_components/tutor/calender/calender.component';
import { BookingInfoComponent } from './_components/misc/booking-info/booking-info.component';
import { ChatPageComponent } from './_components/chat/chat-page/chat-page.component';
import { RtchomeComponent } from './_components/webrtc/rtchome/rtchome.component';
import { RtcclientComponent } from './_components/webrtc/rtcclient/rtcclient.component';
import { RtcclientComponent2 } from './_components/webrtc/rtcclient-2/rtcclient-2.component';



const routes: Routes = [

  { path: "", component: RtchomeComponent, canActivate: [authGuard] },
  { path: "rtc-home", component: RtchomeComponent},
  { path: "rtc-client", component: RtcclientComponent},
  { path: "rtc-client-2", component: RtcclientComponent2},

  {
    path: "", runGuardsAndResolvers: "always", canActivate: [authGuard], children: [
    ]
  },

  { path: "tutor-search", component: TutorSearchComponent },
  { path: "tutor-profile", component: TutorProfileComponent },
  { path: "calender", component: CalenderComponent },
  { path: "booking-info", component: BookingInfoComponent },
  { path: "chat-page", component: ChatPageComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },

  { path: "**", component: RtchomeComponent, pathMatch: "full" }, //Create NotFound Component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
