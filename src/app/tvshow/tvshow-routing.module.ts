import { NgModule } from "@angular/core";
import { TvshowComponent } from "./tvshow.component";
import { RouterModule, Routes } from "@angular/router";
import { RecommendationComponent } from "./recommendation/recommendation.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
    {
      path: '', component: TvshowComponent,
      children: [
        { path: 'dispShows', component: RecommendationComponent, canActivate: [AuthGuard],} 
      ],
      canActivate: [AuthGuard]
    },
  ];
  
  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class TvShowRoutingModule { }