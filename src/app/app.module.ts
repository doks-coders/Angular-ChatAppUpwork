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
import { LoginComponent } from './_components/authentication/login/login.component';
import { RegisterComponent } from './_components/authentication/register/register.component';
import { GroupItemComponent } from './_components/group/group-item/group-item.component';
import { GroupListComponent } from './_components/group/group-list/group-list.component';
import { ChatMessageComponent } from './_components/chat/chat-message/chat-message.component';
import { ChatPageComponent } from './_components/chat/chat-page/chat-page.component';
import { NavbarComponent } from './_components/layout/navbar/navbar.component';
import { ProfileEditComponent } from './_components/user/profile-edit/profile-edit.component';
import { UserItemComponent } from './_components/user/user-item/user-item.component';
import { UserListComponent } from './_components/user/user-list/user-list.component';
import { MyGroupsComponent } from './_components/group/my-groups/my-groups.component';
import { CreateGroupComponent } from './_components/group/create-group/create-group.component';
import { GroupedInputComponent } from './_components/misc/grouped-input/grouped-input.component';
import { GroupMessageComponent } from './_components/chat/group-message/group-message.component';
import { ActiveGroupMembersComponent } from './_components/chat/active-group-members/active-group-members.component';
import { DirectMessageComponent } from './_components/chat/direct-message/direct-message.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { GroupGridComponent } from './_components/group/group-grid/group-grid.component';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { SetPasswordComponent } from './_components/authentication/set-password/set-password.component';
import { CheckEmailPageComponent } from './_components/misc/check-email-page/check-email-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GroupItemComponent,
    GroupListComponent,
    ChatMessageComponent,
    ChatPageComponent,
    NavbarComponent,
    ProfileEditComponent,
    UserItemComponent,
    UserListComponent,
    MyGroupsComponent,
    CreateGroupComponent,
    GroupedInputComponent,
    GroupMessageComponent,
    ActiveGroupMembersComponent,
    DirectMessageComponent,
    GroupGridComponent,
    SetPasswordComponent,
    CheckEmailPageComponent


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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
