import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const userAccount = () => import(`./userAccount/useraccount.module`).then(x => x.UserAccountModule);
const tvShow = () => import(`./tvshow/tvshow.module`).then(x => x.TvshowModule);
const routes: Routes = [
  { path: 'user', loadChildren: userAccount  },
  { path: 'tvShow', loadChildren: tvShow , canActivate: [AuthGuard]},
  

  // otherwise redirect to home
  // { path: '**', redirectTo: 'user' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
