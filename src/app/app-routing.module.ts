import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { UserListComponent } from './_components/user/user-list/user-list.component';
import { GroupListComponent } from './_components/group/group-list/group-list.component';
import { MyGroupsComponent } from './_components/group/my-groups/my-groups.component';
import { CreateGroupComponent } from './_components/group/create-group/create-group.component';
import { RegisterComponent } from './_components/authentication/register/register.component';
import { LoginComponent } from './_components/authentication/login/login.component';
import { GroupMessageComponent } from './_components/chat/group-message/group-message.component';
import { DirectMessageComponent } from './_components/chat/direct-message/direct-message.component';
import { hubGuard } from './_guards/hub.guard';
import { ProfileEditComponent } from './_components/user/profile-edit/profile-edit.component';
import { authGuard } from './_guards/auth.guard';
import { SetPasswordComponent } from './_components/authentication/set-password/set-password.component';
import { CheckEmailPageComponent } from './_components/misc/check-email-page/check-email-page.component';



const routes: Routes = [

  { path: "", component: HomeComponent, canActivate: [authGuard] },

  {
    path: "", runGuardsAndResolvers: "always", canActivate: [authGuard], children: [
      { path: "user-search", component: UserListComponent },
      { path: "group-search", component: GroupListComponent },
      { path: "my-groups", component: MyGroupsComponent },
      { path: "create-group", component: CreateGroupComponent },

      { path: "user-edit-profile", component: ProfileEditComponent },
      { path: "group-message/:groupId", component: GroupMessageComponent, canDeactivate: [hubGuard] },
      { path: "direct-message/:userId", component: DirectMessageComponent, canDeactivate: [hubGuard] },
    ]
  },


  { path: "set-password/:userId", component: SetPasswordComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "check-email", component: CheckEmailPageComponent },
  { path: "**", component: HomeComponent, pathMatch: "full" }, //Create NotFound Component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
