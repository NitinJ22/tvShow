import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './userAccount/login/login.component';
import { RegisterComponent } from './userAccount/register/register.component';
import { TvshowComponent } from './tvshow/tvshow.component';
import { UserAccountModule } from './userAccount/useraccount.module';
import { TvshowModule } from './tvshow/tvshow.module';
import { SummaryFilterPipe } from './services/summary-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserAccountModule,
    TvshowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
