import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { UserAccountComponent } from "./useraccount.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: '', component: UserAccountComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UseraccountRoutingModule { }