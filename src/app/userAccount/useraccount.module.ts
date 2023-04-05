import { NgModule } from "@angular/core";
import { UserAccountComponent } from "./useraccount.component";
import { AppRoutingModule } from "../app-routing.module";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule } from '@angular/forms';
import { UseraccountRoutingModule } from "./useraccount-routing.module";

@NgModule({
    declarations: [
      UserAccountComponent,
      LoginComponent,
      RegisterComponent
    ],
    imports: [
      UseraccountRoutingModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [],
  })
  export class UserAccountModule { }