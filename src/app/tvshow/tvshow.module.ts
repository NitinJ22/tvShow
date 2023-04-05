import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowRoutingModule } from './tvshow-routing.module';
import { TvshowComponent } from './tvshow.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import {TableModule} from 'primeng/table';
import { SummaryFilterPipe } from '../services/summary-filter.pipe';


@NgModule({
  declarations: [
    TvshowComponent,
    RecommendationComponent,
    SummaryFilterPipe
  ],
  imports: [
    CommonModule,
    TableModule,
    TvShowRoutingModule,
  ],
  providers: []
})
export class TvshowModule { }
